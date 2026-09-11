import { BackendError } from './errors.js';
import { sessionStore as storage } from './storage.js';

const TOKEN = 'smart.rest.token';

/**
 * Generic JSON/REST backend. The contract is documented in server/API.md and
 * implemented by server/cloudflare (Workers + D1). Any server that speaks the
 * same endpoints will work (PHP, Node, Supabase edge functions, ...).
 */
export function createRestBackend({ url, studyCode }) {
  const base = url.replace(/\/+$/, '');
  let token = storage.get(TOKEN);

  async function call(method, path, body, { auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && token) headers.Authorization = `Bearer ${token}`;
    let res;
    try {
      res = await fetch(base + path, { method, headers, body: body ? JSON.stringify(body) : undefined, keepalive: method !== 'GET' });
    } catch {
      throw new BackendError('network');
    }
    let data = null;
    try { data = await res.json(); } catch { /* no body */ }
    if (!res.ok) {
      const code = data?.error || (res.status === 401 ? 'unauthorized' : 'server');
      throw new BackendError(code, data?.message || `${res.status} ${path}`);
    }
    return data;
  }

  const setToken = (t) => { token = t; if (t) storage.set(TOKEN, t); else storage.remove(TOKEN); };

  return {
    type: 'rest',
    requiresStudyCode: !studyCode,
    /** Ask the server whether registration needs a study code (unless one is configured client-side). */
    async init() {
      if (studyCode) return;
      try { this.requiresStudyCode = Boolean((await call('GET', '/config', null, { auth: false })).studyCodeRequired); } catch { /* keep asking for it */ }
    },
    async register({ username, pin, language, studyCode: code }) {
      const d = await call('POST', '/auth/register', { username, pin, language, studyCode: code || studyCode }, { auth: false });
      setToken(d.token);
      return { ...d.user, isNew: true };
    },
    async login({ username, pin }) {
      const d = await call('POST', '/auth/login', { username, pin }, { auth: false });
      setToken(d.token);
      return d.user;
    },
    async restore() {
      if (!token) return null;
      try { return (await call('GET', '/me')).user; } catch (e) { if (e.code === 'unauthorized') setToken(null); return null; }
    },
    async logout() { setToken(null); },
    async saveProgress({ stage, extra }) { await call('PUT', '/progress', { stage, extra }); },
    async startSession(session) { await call('POST', '/sessions', session); },
    async endSession(sessionId, summary) { await call('PATCH', `/sessions/${encodeURIComponent(sessionId)}`, summary); },
    async saveTrials(trials) { return call('POST', '/trials', { trials }); },
    /** Best-effort delivery when the page is closing (no response available). */
    beacon(trials) {
      if (!navigator.sendBeacon || !token) return false;
      const blob = new Blob([JSON.stringify({ token, trials })], { type: 'application/json' });
      return navigator.sendBeacon(base + '/trials/beacon', blob);
    },
  };
}
