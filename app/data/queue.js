import { storage } from './storage.js';

/**
 * Buffers trial records, persists them in localStorage and uploads them in
 * batches, retrying on failure. Records survive a page reload; on page hide
 * the remainder is sent with sendBeacon when the backend supports it.
 */
export function createTrialQueue(backend, { username, batchSize = 5, flushIntervalMs = 15000, onStatus } = {}) {
  const key = `smart.queue.${backend.type}.${username}`;
  let pending = storage.get(key, []);
  let flushing = false;
  let timer = null;
  let failures = 0;

  const persist = () => storage.set(key, pending);

  async function flush(force = false) {
    if (flushing || !pending.length) return;
    if (!force && pending.length < batchSize) return;
    flushing = true;
    try {
      while (pending.length) {
        const batch = pending.slice(0, Math.max(batchSize, 25));
        await backend.saveTrials(batch);
        pending = pending.slice(batch.length);
        persist();
        failures = 0;
        onStatus?.({ online: true, pending: pending.length });
      }
    } catch (e) {
      failures++;
      onStatus?.({ online: e.code !== 'network', pending: pending.length, error: e });
    } finally {
      flushing = false;
    }
  }

  function push(record) {
    pending.push(record);
    persist();
    flush();
  }

  function start() {
    timer = setInterval(() => flush(true), Math.min(flushIntervalMs * Math.pow(2, Math.min(failures, 4)), 120000));
    const onHide = () => {
      if (document.visibilityState === 'hidden' && pending.length && backend.beacon) {
        if (backend.beacon(pending)) { pending = []; persist(); }
      }
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);
  }

  function stop() { if (timer) clearInterval(timer); }

  return { push, flush: () => flush(true), start, stop, get pending() { return pending.length; } };
}
