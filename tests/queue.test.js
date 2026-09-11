import test from 'node:test';
import assert from 'node:assert/strict';

// minimal browser globals for the queue module
const store = new Map();
globalThis.localStorage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
globalThis.document = { addEventListener() {}, visibilityState: 'visible' };
globalThis.window = { addEventListener() {} };

const { createTrialQueue } = await import('../app/data/queue.js');

function fakeBackend() {
  const saved = [];
  let failNext = 0;
  return {
    type: 'fake',
    saved,
    failTimes: (n) => { failNext = n; },
    async saveTrials(batch) {
      if (failNext > 0) { failNext--; const e = new Error('offline'); e.code = 'network'; throw e; }
      saved.push(...batch);
      return { saved: batch.length };
    },
  };
}

test('uploads in batches and keeps records until acknowledged', async () => {
  store.clear();
  const backend = fakeBackend();
  const q = createTrialQueue(backend, { username: 'u1', batchSize: 3 });
  q.push({ seq: 1 }); q.push({ seq: 2 });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(backend.saved.length, 0, 'below batch size: nothing sent yet');
  assert.equal(q.pending, 2);
  q.push({ seq: 3 });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(backend.saved.length, 3);
  assert.equal(q.pending, 0);
});

test('retries after a network failure and persists across reloads', async () => {
  store.clear();
  const backend = fakeBackend();
  backend.failTimes(1);
  const q = createTrialQueue(backend, { username: 'u2', batchSize: 1 });
  q.push({ seq: 1 });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(backend.saved.length, 0);
  assert.equal(q.pending, 1, 'record kept after failure');
  assert.equal(JSON.parse(store.get('smart.queue.fake.u2')).length, 1, 'persisted in storage');
  // a "reloaded" queue picks up the persisted record
  const q2 = createTrialQueue(backend, { username: 'u2', batchSize: 1 });
  assert.equal(q2.pending, 1);
  await q2.flush();
  assert.equal(backend.saved.length, 1);
  assert.equal(q2.pending, 0);
});
