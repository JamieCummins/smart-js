/** Small DOM helpers; every screen renders into #screen. */
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Fill {placeholders} in a template string. Values are inserted as-is (they are trusted app strings). */
export function fill(template, params = {}) {
  return String(template).replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m));
}

export function render(html) {
  const root = $('#screen');
  root.innerHTML = html;
  root.scrollTop = 0;
  window.scrollTo(0, 0);
  return root;
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Resolve when an element matching `sel` is clicked (pointerdown, like the original mousedown). */
export function waitClick(sel, root = document) {
  return new Promise((resolve) => {
    const el = typeof sel === 'string' ? $(sel, root) : sel;
    if (!el) { resolve(null); return; }
    const handler = (e) => { e.preventDefault(); el.removeEventListener('pointerdown', handler); resolve(e); };
    el.addEventListener('pointerdown', handler);
  });
}

/** Resolve with the value of whichever of several selectors is pressed first, or 'timeout'. */
export function waitChoice(map, timeoutMs, root = document) {
  return new Promise((resolve) => {
    const cleanups = [];
    let done = false;
    const finish = (value) => {
      if (done) return;
      done = true;
      cleanups.forEach((c) => c());
      resolve(value);
    };
    for (const [sel, value] of Object.entries(map)) {
      const el = $(sel, root);
      if (!el) continue;
      const h = (e) => { e.preventDefault(); finish(value); };
      el.addEventListener('pointerdown', h);
      cleanups.push(() => el.removeEventListener('pointerdown', h));
    }
    if (timeoutMs > 0) {
      const t = setTimeout(() => finish('timeout'), timeoutMs);
      cleanups.push(() => clearTimeout(t));
    }
  });
}

export function requestFullscreen() {
  const el = document.documentElement;
  const fn = el.requestFullscreen || el.webkitRequestFullscreen;
  if (fn) { try { const p = fn.call(el); if (p?.catch) p.catch(() => {}); } catch { /* ignore */ } }
}
