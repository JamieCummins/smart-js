/**
 * SMART training API - Cloudflare Worker + D1 reference implementation of server/API.md.
 *
 * Bindings (wrangler.toml / dashboard):
 *   DB               D1 database (schema.sql)
 *   AUTH_SECRET      secret used to sign login tokens        (wrangler secret put AUTH_SECRET)
 *   ADMIN_TOKEN      secret for the /admin endpoints          (wrangler secret put ADMIN_TOKEN)
 *   STUDY_CODE       optional: study codes accepted at registration (wrangler secret put STUDY_CODE)
 *                    "draak2026" or "draak2026=SMART RCT,zomer27=Pilot wave 2"; the code is stored
 *                    on the account as its `study` tag. Empty = open registration, no tag.
 *   ALLOWED_ORIGINS  comma-separated list of allowed origins, or "*" (default)
 */

const USERNAME_RE = /^[a-z0-9_-]{2,32}$/;
const PIN_RE = /^\d{4,8}$/;
const TOKEN_TTL_SEC = 24 * 3600;
const MAX_TRIALS_PER_REQUEST = 200;
const MAX_FAILED_LOGINS = 10;
const LOCK_MINUTES = 15;
const FIRST_STAGE = 5;

// ---------------------------------------------------------------- helpers ----
const enc = new TextEncoder();
const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const now = () => new Date().toISOString();

async function hashPin(pin, saltHex) {
  const salt = saltHex ? Uint8Array.from(saltHex.match(/../g).map((h) => parseInt(h, 16))) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256);
  return { hash: hex(bits), salt: hex(salt) };
}

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

async function makeToken(env, userId) {
  const payload = b64url(enc.encode(JSON.stringify({ uid: userId, exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SEC })));
  return `${payload}.${await hmac(env.AUTH_SECRET, payload)}`;
}

async function verifyToken(env, token) {
  if (!token || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  if ((await hmac(env.AUTH_SECRET, payload)) !== sig) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    if (!data.uid || data.exp < Date.now() / 1000) return null;
    return data.uid;
  } catch { return null; }
}

/** Parse STUDY_CODE into a Map of code -> label. */
function studyCodes(env) {
  const map = new Map();
  for (const part of String(env.STUDY_CODE || '').split(',')) {
    const [code, label] = part.split('=').map((x) => x.trim());
    if (code) map.set(code, label || code);
  }
  return map;
}

class HttpError extends Error {
  constructor(status, error, message) { super(message || error); this.status = status; this.error = error; }
}

function corsHeaders(env, request) {
  const allowed = (env.ALLOWED_ORIGINS || '*').split(',').map((s) => s.trim());
  const origin = request.headers.get('Origin') || '';
  const allow = allowed.includes('*') ? '*' : allowed.includes(origin) ? origin : allowed[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } });

async function readJson(request) {
  try { return await request.json(); } catch { throw new HttpError(400, 'bad_request', 'Body must be JSON'); }
}

const publicUser = (u, p) => ({
  id: u.id, username: u.username, language: u.language, study: u.study || null, createdAt: u.created_at,
  stage: p?.stage ?? FIRST_STAGE, sessionsCompleted: p?.sessions_completed ?? 0, extra: p?.extra ? JSON.parse(p.extra) : null,
});

async function loadUser(env, userId) {
  const u = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  if (!u) throw new HttpError(401, 'unauthorized');
  const p = await env.DB.prepare('SELECT * FROM progress WHERE user_id = ?').bind(userId).first();
  return { u, p };
}

async function requireUser(env, request) {
  const auth = request.headers.get('Authorization') || '';
  const uid = await verifyToken(env, auth.replace(/^Bearer\s+/i, ''));
  if (!uid) throw new HttpError(401, 'unauthorized');
  return uid;
}

function requireAdmin(env, request) {
  const auth = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!env.ADMIN_TOKEN || auth !== env.ADMIN_TOKEN) throw new HttpError(401, 'unauthorized');
}

function toCsv(rows) {
  if (!rows.length) return '';
  const cols = Object.keys(rows[0]);
  const esc = (v) => { const s = v == null ? '' : String(v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n') + '\n';
}

// ------------------------------------------------------------- handlers ----
async function register(env, body) {
  const username = String(body.username || '').trim().toLowerCase();
  const pin = String(body.pin || '').trim();
  if (!USERNAME_RE.test(username)) throw new HttpError(400, 'username');
  if (!PIN_RE.test(pin)) throw new HttpError(400, 'pin');
  const codes = studyCodes(env);
  const code = String(body.studyCode || '').trim();
  if (codes.size && !codes.has(code)) throw new HttpError(403, 'studyCode');
  const study = codes.size ? code : null;
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
  if (existing) throw new HttpError(409, 'taken');
  const { hash, salt } = await hashPin(pin);
  const language = String(body.language || 'nl').slice(0, 8);
  const res = await env.DB.prepare('INSERT INTO users (username, pin_hash, salt, language, study, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(username, hash, salt, language, study, now()).run();
  const id = res.meta.last_row_id;
  await env.DB.prepare('INSERT INTO progress (user_id, stage, sessions_completed, updated_at) VALUES (?, ?, 0, ?)').bind(id, FIRST_STAGE, now()).run();
  const { u, p } = await loadUser(env, id);
  return json({ token: await makeToken(env, id), user: publicUser(u, p) }, 201);
}

async function login(env, body) {
  const username = String(body.username || '').trim().toLowerCase();
  const pin = String(body.pin || '').trim();
  const u = await env.DB.prepare('SELECT * FROM users WHERE username = ?').bind(username).first();
  if (!u) throw new HttpError(401, 'invalid');
  if (u.locked_until && new Date(u.locked_until) > new Date()) throw new HttpError(429, 'invalid', 'Too many attempts; try again later');
  const { hash } = await hashPin(pin, u.salt);
  if (hash !== u.pin_hash) {
    const failed = (u.failed_logins || 0) + 1;
    const locked = failed >= MAX_FAILED_LOGINS ? new Date(Date.now() + LOCK_MINUTES * 60000).toISOString() : null;
    await env.DB.prepare('UPDATE users SET failed_logins = ?, locked_until = ? WHERE id = ?').bind(locked ? 0 : failed, locked, u.id).run();
    throw new HttpError(401, 'invalid');
  }
  await env.DB.prepare('UPDATE users SET failed_logins = 0, locked_until = NULL, last_login_at = ? WHERE id = ?').bind(now(), u.id).run();
  const p = await env.DB.prepare('SELECT * FROM progress WHERE user_id = ?').bind(u.id).first();
  return json({ token: await makeToken(env, u.id), user: publicUser(u, p) });
}

async function saveTrials(env, userId, trials) {
  if (!Array.isArray(trials) || !trials.length) return json({ saved: 0 });
  if (trials.length > MAX_TRIALS_PER_REQUEST) throw new HttpError(413, 'too_many', `Max ${MAX_TRIALS_PER_REQUEST} trials per request`);
  const stmt = env.DB.prepare(`INSERT OR IGNORE INTO trials
    (user_id, session_id, seq, stage, phase, trial_type, correct, response, correct_response, rt_ms, used_hint, timed_out, tally_after, question, stimuli, payload, client_time, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const batch = trials.map((t) => stmt.bind(
    userId, String(t.sessionId || ''), Number(t.seq) || 0, Number(t.stage) || null, t.phase || null, t.trialType || null,
    t.correct == null ? null : Number(t.correct), t.response ?? null, t.correctResponse ?? null, t.rtMs == null ? null : Number(t.rtMs),
    Number(t.usedHint) || 0, Number(t.timedOut) || 0, t.tallyAfter == null ? null : Number(t.tallyAfter), t.question ?? null,
    Array.isArray(t.stimuli) ? t.stimuli.join(' ') : null, JSON.stringify(t), t.clientTime || null, now(),
  ));
  const results = await env.DB.batch(batch);
  const inserted = results.reduce((n, r) => n + (r.meta?.changes || 0), 0);
  return json({ saved: inserted, received: trials.length });
}

const EXPORTS = {
  users: { sql: 'SELECT id, username, language, study, created_at, last_login_at FROM users', key: 'id', userCol: null, timeCol: null },
  progress: { sql: 'SELECT * FROM progress', key: 'user_id', userCol: 'user_id', timeCol: null },
  sessions: { sql: 'SELECT * FROM sessions', key: 'rowid', userCol: 'user_id', timeCol: 'started_at' },
  trials: { sql: 'SELECT * FROM trials', key: 'id', userCol: 'user_id', timeCol: 'created_at' },
};

/**
 * Streams a table as CSV (or JSON) in pages of 500 rows, so exports of
 * millions of rows neither exhaust worker memory nor time out.
 * Filters: ?username=  ?since=ISO  ?until=ISO  ?format=json  ?limit=N
 */
async function exportTable(env, url, table) {
  const spec = EXPORTS[table];
  if (!spec) throw new HttpError(404, 'not_found');
  const where = [];
  const args = [];
  const username = url.searchParams.get('username');
  if (username && spec.userCol) {
    const u = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username.toLowerCase()).first();
    where.push(`${spec.userCol} = ?`); args.push(u ? u.id : -1);
  }
  const study = url.searchParams.get('study');
  if (study) {
    if (spec.userCol) { where.push(`${spec.userCol} IN (SELECT id FROM users WHERE study = ?)`); args.push(study); }
    else { where.push('study = ?'); args.push(study); }
  }
  for (const [param, op] of [['since', '>='], ['until', '<']]) {
    const v = url.searchParams.get(param);
    if (v && spec.timeCol) { where.push(`${spec.timeCol} ${op} ?`); args.push(v); }
  }
  const limit = Math.min(Number(url.searchParams.get('limit')) || Infinity, 50_000_000);
  const asJson = url.searchParams.get('format') === 'json';
  const PAGE = 500;
  const key = spec.key === 'rowid' ? 'rowid' : spec.key;
  const baseSql = spec.sql.replace('SELECT *', `SELECT ${key === 'rowid' ? 'rowid AS _k, ' : ''}*`);

  const esc = (v) => { const t = v == null ? '' : String(v); return /[",\n\r]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let after = -1, sent = 0, first = true, cols = null;
      try {
        if (asJson) controller.enqueue(encoder.encode('['));
        while (sent < limit) {
          const sql = `${baseSql} WHERE ${[...where, `${key} > ?`].join(' AND ')} ORDER BY ${key} LIMIT ?`;
          const { results } = await env.DB.prepare(sql).bind(...args, after, Math.min(PAGE, limit - sent)).all();
          if (!results.length) break;
          for (const r of results) {
            after = r._k ?? r[key];
            delete r._k;
            if (asJson) { controller.enqueue(encoder.encode((first ? '' : ',') + JSON.stringify(r))); }
            else {
              if (first) { cols = Object.keys(r); controller.enqueue(encoder.encode(cols.join(',') + '\n')); }
              controller.enqueue(encoder.encode(cols.map((c) => esc(r[c])).join(',') + '\n'));
            }
            first = false; sent++;
          }
          if (results.length < PAGE) break;
        }
        if (asJson) controller.enqueue(encoder.encode(']'));
        controller.close();
      } catch (e) { controller.error(e); }
    },
  });
  return new Response(stream, {
    headers: asJson
      ? { 'Content-Type': 'application/json' }
      : { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="smart-${table}.csv"` },
  });
}

async function adminUsers(env) {
  const { results } = await env.DB.prepare(`
    SELECT u.id, u.username, u.language, u.study, u.created_at, u.last_login_at, p.stage, p.sessions_completed, p.updated_at,
      (SELECT COUNT(*) FROM trials t WHERE t.user_id = u.id) AS trials
    FROM users u LEFT JOIN progress p ON p.user_id = u.id ORDER BY u.study, u.username`).all();
  const codes = studyCodes(env);
  for (const r of results) r.study_label = r.study ? codes.get(r.study) || r.study : null;
  return json(results);
}

async function adminCreateUsers(env, body) {
  const created = [];
  const errors = [];
  for (const entry of body.users || []) {
    const username = String(entry.username || '').trim().toLowerCase();
    const pin = String(entry.pin || '').trim();
    if (!USERNAME_RE.test(username) || !PIN_RE.test(pin)) { errors.push({ username, error: 'invalid' }); continue; }
    const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
    if (existing) { errors.push({ username, error: 'taken' }); continue; }
    const { hash, salt } = await hashPin(pin);
    const study = entry.study ? String(entry.study).trim() : null;
    const res = await env.DB.prepare('INSERT INTO users (username, pin_hash, salt, language, study, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(username, hash, salt, String(entry.language || 'nl').slice(0, 8), study, now()).run();
    const stage = Number(entry.stage) || FIRST_STAGE;
    await env.DB.prepare('INSERT INTO progress (user_id, stage, sessions_completed, updated_at) VALUES (?, ?, 0, ?)').bind(res.meta.last_row_id, stage, now()).run();
    created.push(username);
  }
  return json({ created, errors });
}

async function adminSetProgress(env, body) {
  const username = String(body.username || '').trim().toLowerCase();
  const u = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
  if (!u) throw new HttpError(404, 'not_found');
  if (body.stage != null) await env.DB.prepare('UPDATE progress SET stage = ?, updated_at = ? WHERE user_id = ?').bind(Number(body.stage), now(), u.id).run();
  if (body.study !== undefined) await env.DB.prepare('UPDATE users SET study = ? WHERE id = ?').bind(body.study ? String(body.study).trim() : null, u.id).run();
  if (body.pin != null) {
    if (!PIN_RE.test(String(body.pin))) throw new HttpError(400, 'pin');
    const { hash, salt } = await hashPin(String(body.pin));
    await env.DB.prepare('UPDATE users SET pin_hash = ?, salt = ?, failed_logins = 0, locked_until = NULL WHERE id = ?').bind(hash, salt, u.id).run();
  }
  return json({ ok: true });
}

/** Permanently remove one participant and all their data (used to clean up load-test accounts). */
async function adminDeleteUser(env, url) {
  const username = String(url.searchParams.get('username') || '').trim().toLowerCase();
  const u = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
  if (!u) throw new HttpError(404, 'not_found');
  const results = await env.DB.batch([
    env.DB.prepare('DELETE FROM trials WHERE user_id = ?').bind(u.id),
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(u.id),
    env.DB.prepare('DELETE FROM progress WHERE user_id = ?').bind(u.id),
    env.DB.prepare('DELETE FROM users WHERE id = ?').bind(u.id),
  ]);
  return json({ deleted: username, trials: results[0].meta.changes, sessions: results[1].meta.changes });
}

// ---------------------------------------------------------------- router ----
async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const m = request.method;

  if (path === '/health' && m === 'GET') return json({ ok: true, time: now() });
  if (path === '/config' && m === 'GET') return json({ studyCodeRequired: studyCodes(env).size > 0, firstStage: FIRST_STAGE });

  if (path === '/auth/register' && m === 'POST') return register(env, await readJson(request));
  if (path === '/auth/login' && m === 'POST') return login(env, await readJson(request));

  if (path === '/trials/beacon' && m === 'POST') {
    const body = await readJson(request);
    const uid = await verifyToken(env, body.token);
    if (!uid) throw new HttpError(401, 'unauthorized');
    return saveTrials(env, uid, body.trials);
  }

  if (path.startsWith('/admin/')) {
    requireAdmin(env, request);
    if (path === '/admin/users' && m === 'GET') return adminUsers(env);
    if (path === '/admin/users' && m === 'POST') return adminCreateUsers(env, await readJson(request));
    if (path === '/admin/users' && m === 'PATCH') return adminSetProgress(env, await readJson(request));
    if (path === '/admin/users' && m === 'DELETE') return adminDeleteUser(env, url);
    if (path === '/admin/studies' && m === 'GET') {
      const { results } = await env.DB.prepare('SELECT study, COUNT(*) AS participants FROM users GROUP BY study').all();
      const codes = studyCodes(env);
      const known = [...codes].map(([code, label]) => ({ code, label, participants: results.find((r) => r.study === code)?.participants || 0 }));
      const unknown = results.filter((r) => !codes.has(r.study)).map((r) => ({ code: r.study, label: r.study ? '(code no longer configured)' : '(no study)', participants: r.participants }));
      return json([...known, ...unknown]);
    }
    const ex = path.match(/^\/admin\/export\/(\w+)$/);
    if (ex && m === 'GET') return exportTable(env, url, ex[1]);
    throw new HttpError(404, 'not_found');
  }

  const uid = await requireUser(env, request);

  if (path === '/me' && m === 'GET') { const { u, p } = await loadUser(env, uid); return json({ user: publicUser(u, p) }); }

  if (path === '/progress' && m === 'PUT') {
    const body = await readJson(request);
    const stage = Number(body.stage);
    if (!Number.isFinite(stage)) throw new HttpError(400, 'bad_request', 'stage must be a number');
    await env.DB.prepare('INSERT INTO progress (user_id, stage, sessions_completed, extra, updated_at) VALUES (?, ?, 0, ?, ?) ON CONFLICT(user_id) DO UPDATE SET stage = excluded.stage, extra = excluded.extra, updated_at = excluded.updated_at')
      .bind(uid, stage, body.extra ? JSON.stringify(body.extra) : null, now()).run();
    return json({ ok: true });
  }

  if (path === '/sessions' && m === 'POST') {
    const b = await readJson(request);
    if (!b.id) throw new HttpError(400, 'bad_request', 'session id required');
    await env.DB.prepare('INSERT OR IGNORE INTO sessions (id, user_id, started_at, stage_start, language, user_agent, screen, viewport, debug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(String(b.id), uid, b.startedAt || now(), Number(b.stage) || null, b.language || null, b.userAgent || null, b.screen || null, b.viewport || null, b.debug ? 1 : 0).run();
    return json({ ok: true, sessionId: b.id }, 201);
  }

  const sm = path.match(/^\/sessions\/([^/]+)$/);
  if (sm && m === 'PATCH') {
    const b = await readJson(request);
    const res = await env.DB.prepare('UPDATE sessions SET ended_at = ?, stage_end = ?, levels_passed = ?, trials_completed = ?, end_reason = ? WHERE id = ? AND user_id = ? AND ended_at IS NULL')
      .bind(b.endedAt || now(), Number(b.stageEnd) || null, Number(b.levelsPassed) || 0, Number(b.trialsCompleted) || 0, b.endReason || null, decodeURIComponent(sm[1]), uid).run();
    if (res.meta.changes > 0) await env.DB.prepare('UPDATE progress SET sessions_completed = sessions_completed + 1, updated_at = ? WHERE user_id = ?').bind(now(), uid).run();
    return json({ ok: true });
  }

  if (path === '/trials' && m === 'POST') return saveTrials(env, uid, (await readJson(request)).trials);

  throw new HttpError(404, 'not_found');
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(env, request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    try {
      const res = await route(request, env);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    } catch (e) {
      const status = e instanceof HttpError ? e.status : 500;
      if (status === 500) console.error(e);
      return json({ error: e instanceof HttpError ? e.error : 'server', message: e.message }, status, cors);
    }
  },
};
