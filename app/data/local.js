import { BackendError } from './errors.js';
import { storage, sessionStore, uuid } from './storage.js';
import { toCsv } from '../engine/csv.js';

const USERS = 'smart.local.users';
const SESSION = 'smart.local.session';
const trialsKey = (u) => `smart.local.trials.${u}`;
const sessionsKey = (u) => `smart.local.sessions.${u}`;

/**
 * Browser-only backend: accounts, progress and trial data live in this
 * browser's localStorage. Useful for demos, piloting and offline testing.
 * Data can be exported as CSV from the debug panel.
 */
export function createLocalBackend({ firstStage }) {
  let current = null;
  const users = () => storage.get(USERS, {});
  const saveUsers = (u) => storage.set(USERS, u);
  const publicUser = (u) => ({ id: u.id, username: u.username, language: u.language, stage: u.stage, sessionsCompleted: u.sessionsCompleted, createdAt: u.createdAt, isNew: false });

  return {
    type: 'local',
    requiresStudyCode: false,
    async init() {},
    async register({ username, pin, language }) {
      const all = users();
      if (all[username]) throw new BackendError('taken');
      const u = { id: uuid(), username, pin, language, stage: firstStage, sessionsCompleted: 0, createdAt: new Date().toISOString() };
      all[username] = u;
      saveUsers(all);
      current = u;
      sessionStore.set(SESSION, username);
      return { ...publicUser(u), isNew: true };
    },
    async login({ username, pin }) {
      const u = users()[username];
      if (!u || u.pin !== pin) throw new BackendError('invalid');
      current = u;
      sessionStore.set(SESSION, username);
      return publicUser(u);
    },
    async restore() {
      const name = sessionStore.get(SESSION);
      const u = name ? users()[name] : null;
      if (!u) return null;
      current = u;
      return publicUser(u);
    },
    async logout() { current = null; sessionStore.remove(SESSION); },
    async saveProgress({ stage, extra }) {
      const all = users();
      const u = all[current.username];
      u.stage = stage;
      if (extra) u.extra = extra;
      saveUsers(all);
      current = u;
    },
    async startSession(session) {
      const list = storage.get(sessionsKey(current.username), []);
      list.push({ ...session, endedAt: null });
      storage.set(sessionsKey(current.username), list);
    },
    async endSession(sessionId, summary) {
      const list = storage.get(sessionsKey(current.username), []);
      const s = list.find((x) => x.id === sessionId);
      if (s) Object.assign(s, summary, { endedAt: new Date().toISOString() });
      storage.set(sessionsKey(current.username), list);
      const all = users();
      all[current.username].sessionsCompleted = (all[current.username].sessionsCompleted || 0) + 1;
      saveUsers(all);
    },
    async saveTrials(trials) {
      const key = trialsKey(current.username);
      const list = storage.get(key, []);
      const seen = new Set(list.map((t) => `${t.sessionId}:${t.seq}`));
      for (const t of trials) if (!seen.has(`${t.sessionId}:${t.seq}`)) list.push(t);
      if (!storage.set(key, list)) throw new BackendError('server', 'localStorage full');
      return { saved: trials.length };
    },
    /** CSV export of everything stored for the current user (debug panel). */
    exportCsv() {
      const list = storage.get(trialsKey(current.username), []);
      if (!list.length) return '';
      const flat = list.map((t) => ({ ...t, row: JSON.stringify(t.row), stimuli: (t.stimuli || []).join(' ') }));
      return toCsv(flat, Object.keys(flat[0]));
    },
  };
}
