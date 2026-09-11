#!/usr/bin/env node
/**
 * Load / integrity test for the SMART data API.
 *
 * Simulates N children playing at the same time, using exactly the request
 * pattern of the real app (register -> session -> trial batches of 5 with
 * retries -> progress saves -> session end), then verifies through the admin
 * export that every trial arrived exactly once, and optionally deletes the
 * test accounts again.
 *
 * Usage:
 *   STUDY_CODE=... ADMIN_TOKEN=... node tools/load-test.js [--api URL] [--users 10] [--trials 200] [--fast] [--cleanup]
 *
 *   --api      API base URL (default: backend.url from app/config.js)
 *   --users    simultaneous simulated children (default 10)
 *   --trials   trials per child (default 200, about one real session)
 *   --fast     no pauses between trials (pure server stress); default paces
 *              at ~0.3 s per trial so 200 trials take about a minute
 *   --cleanup  delete the test accounts afterwards (needs ADMIN_TOKEN)
 *
 * Without ADMIN_TOKEN the traffic still runs but rows cannot be verified.
 */
import config from '../app/config.js';

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => a.startsWith('--') ? [a.slice(2), arr[i + 1]?.startsWith('--') || arr[i + 1] === undefined ? true : arr[i + 1]] : []).filter(Boolean));
const API = (args.api || config.backend.url).replace(/\/+$/, '');
const USERS = Number(args.users) || 10;
const TRIALS = Number(args.trials) || 200;
const FAST = Boolean(args.fast);
const CLEANUP = Boolean(args.cleanup);
const STUDY_CODE = process.env.STUDY_CODE || '';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const BATCH = config.data.batchSize || 5;
const RUN = Date.now().toString(36);

if (!API) { console.error('No API url: pass --api or set backend.url in app/config.js'); process.exit(1); }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const timings = {};
function record(kind, ms, ok) { (timings[kind] ||= { ms: [], fail: 0 }); timings[kind].ms.push(ms); if (!ok) timings[kind].fail++; }
const pct = (arr, p) => { const s = [...arr].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };

async function call(kind, method, path, body, token, attempts = 4) {
  for (let i = 1; ; i++) {
    const t0 = performance.now();
    try {
      const res = await fetch(API + path, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
      const data = await res.json().catch(() => null);
      record(kind, performance.now() - t0, res.ok);
      if (res.ok) return data;
      if (res.status < 500 || i >= attempts) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(data)}`);
    } catch (e) {
      record(kind, performance.now() - t0, false);
      if (i >= attempts) throw e;
    }
    await sleep(300 * i); // client-style back-off
  }
}

async function simulateChild(i) {
  const username = `loadtest-${RUN}-${i}`;
  const pin = '1234';
  const { token } = await call('register', 'POST', '/auth/register', { username, pin, language: 'nl', studyCode: STUDY_CODE });
  const sessionId = crypto.randomUUID();
  await call('session-start', 'POST', '/sessions', { id: sessionId, stage: 5, language: 'nl', startedAt: new Date().toISOString(), userAgent: 'load-test', screen: '1x1', viewport: '1x1', debug: true }, token);
  let stage = 5;
  let pending = [];
  for (let seq = 1; seq <= TRIALS; seq++) {
    pending.push({
      sessionId, seq, stage, phase: seq % 20 < 16 ? 'training' : 'testing', trialType: 'standard', trialInLevel: seq % 20 || 20,
      stimuli: ['LAH', 'JAX', 'CET', 'SUR'], row: { relation_1: 'is hetzelfde als', stage: String(stage) }, question: 'Is LAH hetzelfde als CET?',
      correctResponse: 'yes', response: 'yes', correct: 1, rtMs: 800 + Math.round(Math.random() * 2000), usedHint: 0, timedOut: 0, tallyAfter: seq % 16,
      levelEvent: 'continue', positions: { yes: 'left', no: 'right' }, shownAt: new Date().toISOString(), clientTime: new Date().toISOString(), criterion: 16, testTrials: 16,
    });
    if (pending.length >= BATCH) { await call('trials', 'POST', '/trials', { trials: pending }, token); pending = []; }
    if (seq % 20 === 0) { stage++; await call('progress', 'PUT', '/progress', { stage, extra: { lastDragon: 'test' } }, token); }
    if (!FAST) await sleep(200 + Math.random() * 200);
  }
  if (pending.length) await call('trials', 'POST', '/trials', { trials: pending }, token);
  // re-send the last batch on purpose: the server must ignore the duplicates
  const dup = Array.from({ length: BATCH }, (_, k) => ({ sessionId, seq: TRIALS - k, stage, phase: 'training', correct: 1 }));
  await call('trials-dup', 'POST', '/trials', { trials: dup }, token);
  await call('session-end', 'PATCH', `/sessions/${sessionId}`, { endedAt: new Date().toISOString(), stageEnd: stage, levelsPassed: stage - 5, trialsCompleted: TRIALS, endReason: 'time' }, token);
  return { username, sessionId };
}

async function verify(users) {
  if (!ADMIN_TOKEN) { console.log('\nADMIN_TOKEN not set: skipping row verification.'); return true; }
  let allOk = true;
  console.log('\nVerification (admin export):');
  for (const u of users) {
    const rows = await call('admin-export', 'GET', `/admin/export/trials?username=${u.username}&format=json`, null, ADMIN_TOKEN);
    const seqs = rows.map((r) => r.seq).sort((a, b) => a - b);
    const missing = []; for (let s = 1; s <= TRIALS; s++) if (!seqs.includes(s)) missing.push(s);
    const dupes = seqs.length - new Set(seqs).size;
    const ok = rows.length === TRIALS && !missing.length && !dupes;
    allOk &&= ok;
    console.log(`  ${ok ? 'OK  ' : 'FAIL'} ${u.username}: ${rows.length}/${TRIALS} rows${missing.length ? `, missing ${missing.length} (e.g. ${missing.slice(0, 5).join(',')})` : ''}${dupes ? `, ${dupes} duplicates` : ''}`);
  }
  const sessions = await call('admin-export', 'GET', '/admin/export/sessions?format=json', null, ADMIN_TOKEN);
  const ended = users.filter((u) => sessions.find((s) => s.id === u.sessionId && s.ended_at)).length;
  console.log(`  sessions closed: ${ended}/${users.length}`);
  return allOk && ended === users.length;
}

async function cleanup(users) {
  if (!CLEANUP) { console.log(`\nTest accounts kept (prefix loadtest-${RUN}-). Re-run with --cleanup to delete them, or remove them via admin.html.`); return; }
  if (!ADMIN_TOKEN) { console.log('\n--cleanup needs ADMIN_TOKEN; accounts kept.'); return; }
  for (const u of users) await call('admin-delete', 'DELETE', `/admin/users?username=${u.username}`, null, ADMIN_TOKEN);
  console.log(`\nDeleted ${users.length} test accounts.`);
}

console.log(`Load test: ${USERS} simultaneous children x ${TRIALS} trials against ${API}${FAST ? ' (fast mode)' : ''}`);
const t0 = performance.now();
const results = await Promise.allSettled(Array.from({ length: USERS }, (_, i) => simulateChild(i)));
const users = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
const failed = results.filter((r) => r.status === 'rejected');
console.log(`\nFinished in ${((performance.now() - t0) / 1000).toFixed(1)} s. Children completed: ${users.length}/${USERS}`);
for (const f of failed) console.log('  child failed:', f.reason.message);
console.log('\nRequests (ms):');
console.log('  kind            count  fail   p50   p95   max');
for (const [k, v] of Object.entries(timings)) console.log(`  ${k.padEnd(15)} ${String(v.ms.length).padStart(5)} ${String(v.fail).padStart(5)} ${String(Math.round(pct(v.ms, 0.5))).padStart(5)} ${String(Math.round(pct(v.ms, 0.95))).padStart(5)} ${String(Math.round(Math.max(...v.ms))).padStart(5)}`);
let verified = false;
try { verified = await verify(users); } catch (e) { console.log(`\nVerification failed: ${e.message}`); }
const ok = verified && !failed.length;
try { await cleanup(users); } catch (e) { console.log(`\nCleanup failed: ${e.message}`); }
console.log(ok ? '\nRESULT: PASS' : '\nRESULT: FAIL');
process.exit(ok ? 0 : 1);
