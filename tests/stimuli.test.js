import test from 'node:test';
import assert from 'node:assert/strict';
import { StimulusPool, bucketsFromRows } from '../app/engine/stimuli.js';
import { makeRng } from '../app/engine/random.js';

test('draws one syllable per bucket without repeating within a session', () => {
  const buckets = [['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'], ['D1', 'D2', 'D3']];
  const pool = new StimulusPool(buckets, makeRng(1));
  const seen = [new Set(), new Set(), new Set(), new Set()];
  for (let t = 0; t < 3; t++) {
    for (let i = 1; i <= 4; i++) {
      assert.ok(!seen[i - 1].has(pool.slot(i)), 'no repeat before bucket exhausted');
      seen[i - 1].add(pool.slot(i));
    }
    pool.next();
  }
  // buckets refill once exhausted, so drawing keeps working
  assert.ok(pool.slot(1).startsWith('A'));
});

test('bucketsFromRows reads syllables.csv layout', () => {
  const rows = [{ bucket_1: 'X', bucket_2: 'Y', bucket_3: 'Z', bucket_4: 'W' }, { bucket_1: 'Q', bucket_2: '', bucket_3: '', bucket_4: '' }];
  assert.deepEqual(bucketsFromRows(rows), [['X', 'Q'], ['Y'], ['Z'], ['W']]);
});
