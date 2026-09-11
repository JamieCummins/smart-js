/** localStorage wrapper that never throws (private mode, quota, disabled storage). */
export const storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
};

/** sessionStorage wrapper: survives a page refresh but not closing the tab (shared computers). */
export const sessionStore = {
  get(key, fallback = null) {
    try { const v = sessionStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
  },
  set(key, value) { try { sessionStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } },
  remove(key) { try { sessionStorage.removeItem(key); } catch { /* ignore */ } },
};

export function uuid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
