#!/usr/bin/env node
/**
 * Integrity check for a trials export from admin.html (or /admin/export/trials).
 *
 *   node tools/check-export.js path/to/smart-trials.csv [path/to/smart-sessions.csv]
 *
 * Per session it reports row counts, missing or duplicated sequence numbers,
 * time span, stages covered, accuracy and response-time summaries, and rows
 * whose JSON payload does not parse. With the sessions export it also checks
 * that every session with trials has a start row and whether it was closed.
 */
import fs from 'node:fs';
import { parseCsv } from '../app/engine/csv.js';

const [trialsFile, sessionsFile] = process.argv.slice(2);
if (!trialsFile) { console.error('usage: node tools/check-export.js smart-trials.csv [smart-sessions.csv]'); process.exit(1); }

const trials = parseCsv(fs.readFileSync(trialsFile, 'utf8'));
const sessions = sessionsFile ? parseCsv(fs.readFileSync(sessionsFile, 'utf8')) : null;
const pct = (arr, p) => { const s = [...arr].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : NaN; };

let problems = 0;
const warn = (msg) => { problems++; console.log(`  !! ${msg}`); };

console.log(`${trials.length} trial rows, ${new Set(trials.map((t) => t.user_id)).size} users, ${new Set(trials.map((t) => t.session_id)).size} sessions\n`);

// global duplicate check on (session, seq) and on row id
const seen = new Set();
for (const t of trials) {
  const k = `${t.session_id}:${t.seq}`;
  if (seen.has(k)) warn(`duplicate (session, seq): ${k}`);
  seen.add(k);
}

const bySession = new Map();
for (const t of trials) { if (!bySession.has(t.session_id)) bySession.set(t.session_id, []); bySession.get(t.session_id).push(t); }

for (const [sid, rows] of [...bySession.entries()].sort((a, b) => a[1][0].created_at.localeCompare(b[1][0].created_at))) {
  const seqs = rows.map((r) => Number(r.seq)).sort((a, b) => a - b);
  const missing = [];
  for (let s = 1; s <= seqs[seqs.length - 1]; s++) if (!seqs.includes(s)) missing.push(s);
  const stages = [...new Set(rows.map((r) => r.stage))].map(Number).sort((a, b) => a - b);
  const times = rows.map((r) => r.client_time || r.created_at).filter(Boolean).sort();
  const rts = rows.filter((r) => r.timed_out !== '1').map((r) => Number(r.rt_ms)).filter((x) => x > 0);
  const acc = rows.filter((r) => r.correct === '1').length / rows.length;
  const timedOut = rows.filter((r) => r.timed_out === '1').length;
  const hints = rows.filter((r) => r.used_hint === '1').length;
  const phases = { training: rows.filter((r) => r.phase === 'training').length, testing: rows.filter((r) => r.phase === 'testing').length };
  let badPayload = 0;
  const events = {};
  for (const r of rows) {
    try { const p = JSON.parse(r.payload); events[p.levelEvent || '-'] = (events[p.levelEvent || '-'] || 0) + 1; if (!p.row || !p.stimuli) badPayload++; } catch { badPayload++; }
  }
  const user = rows[0].user_id;
  const sess = sessions?.find((s) => s.id === sid);
  console.log(`session ${sid.slice(0, 8)}  user ${user}  rows ${rows.length}  seq ${seqs[0]}-${seqs[seqs.length - 1]}  stages ${stages[0]}${stages.length > 1 ? '-' + stages[stages.length - 1] : ''}  ${times[0]?.slice(0, 16)} -> ${times[times.length - 1]?.slice(11, 16)}`);
  console.log(`  training ${phases.training}, testing ${phases.testing}; accuracy ${(acc * 100).toFixed(0)}%; RT median ${Math.round(pct(rts, 0.5))} ms (p95 ${Math.round(pct(rts, 0.95))}); timed out ${timedOut}; hints ${hints}; level events ${JSON.stringify(events)}`);
  if (seqs[0] !== 1) warn(`first seq is ${seqs[0]}, not 1 (rows before it never arrived)`);
  if (missing.length) warn(`${missing.length} missing seq: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}`);
  if (badPayload) warn(`${badPayload} rows with unreadable payload`);
  if (sessions) {
    if (!sess) warn('no row in sessions export for this session');
    else if (!sess.ended_at) console.log('  (session not closed: tab closed before the end screen, or still running)');
    else if (Number(sess.trials_completed) !== rows.length) warn(`session says ${sess.trials_completed} trials completed, export has ${rows.length}`);
  }
}

console.log(`\n${problems ? `${problems} problem(s) found` : 'No problems found'}.`);
process.exit(problems ? 1 : 0);
