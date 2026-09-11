import { storage } from './storage.js';

/**
 * Buffers trial records, persists them in localStorage and uploads them in
 * batches, retrying on failure. Records are only removed from the queue once
 * the server has acknowledged them, so they survive reloads, tab switches and
 * network drops; whatever is left when the tab closes is uploaded the next
 * time the same child plays in the same browser. On tab hide / page hide the
 * queue flushes immediately with a keep-alive request (sendBeacon is not
 * used: cross-origin JSON beacons are dropped by browsers).
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
        const batch = pending.slice(0, Math.max(batchSize, 20)); // keep-alive requests must stay small
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
    const onHide = (e) => {
      if (e.type === 'pagehide' || document.visibilityState === 'hidden') flush(true);
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);
  }

  function stop() { if (timer) clearInterval(timer); }

  return { push, flush: () => flush(true), start, stop, get pending() { return pending.length; } };
}
