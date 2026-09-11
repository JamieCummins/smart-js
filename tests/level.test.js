import test from 'node:test';
import assert from 'node:assert/strict';
import { LevelRunner } from '../app/engine/level.js';

const opts = { criterion: 3, testTrials: 2 };

test('training: consecutive correct answers reach the criterion', () => {
  const l = new LevelRunner(opts);
  assert.equal(l.record({ correct: true }), 'continue');
  assert.equal(l.record({ correct: true }), 'continue');
  assert.equal(l.record({ correct: true }), 'toTesting');
  assert.equal(l.phase, 'testing');
  assert.equal(l.tally, 0);
});

test('training: an error resets the tally, a hint gives no stone', () => {
  const l = new LevelRunner(opts);
  l.record({ correct: true });
  l.record({ correct: true });
  assert.equal(l.record({ correct: false }), 'continue');
  assert.equal(l.tally, 0);
  l.record({ correct: true, usedHint: true });
  assert.equal(l.tally, 0);
  l.record({ correct: true, timedOut: true });
  assert.equal(l.tally, 0);
});

test('testing: all correct passes, any error fails and returns to training', () => {
  const l = new LevelRunner(opts);
  for (let i = 0; i < 3; i++) l.record({ correct: true });
  assert.equal(l.record({ correct: true }), 'continue');
  assert.equal(l.testTrialNumber, 2);
  assert.equal(l.record({ correct: true }), 'passed');

  const m = new LevelRunner(opts);
  for (let i = 0; i < 3; i++) m.record({ correct: true });
  assert.equal(m.record({ correct: false }), 'continue', 'child completes all test trials by default');
  assert.equal(m.record({ correct: true }), 'failed');
  assert.equal(m.phase, 'training');
  assert.equal(m.tally, 0);
});

test('testing: abortOnFirstError ends the test immediately', () => {
  const l = new LevelRunner({ ...opts, abortOnFirstError: true });
  for (let i = 0; i < 3; i++) l.record({ correct: true });
  assert.equal(l.record({ correct: false }), 'failed');
  assert.equal(l.phase, 'training');
});
