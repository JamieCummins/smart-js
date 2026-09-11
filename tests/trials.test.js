import test from 'node:test';
import assert from 'node:assert/strict';
import { TrialSampler, resolveTrial, trialKind } from '../app/engine/trials.js';
import { makeRng } from '../app/engine/random.js';

const pool = { slot: (n) => ['LAH', 'JAX', 'CET', 'SUR'][n - 1] };
const lang = { relationClass: (r) => (r.includes('zelfde') ? 'rel-same' : 'rel-other'), defaultQuestionWord: 'Is' };

test('sampler deals every row before repeating', () => {
  const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const s = new TrialSampler(rows, makeRng(7));
  const first = [s.next(), s.next(), s.next()].map((r) => r.id).sort();
  assert.deepEqual(first, [1, 2, 3]);
  const prev = s.last;
  assert.notEqual(s.next(), prev, 'no immediate repeat across reshuffle');
});

test('standard trial: stim ids map to syllables, hints to NAARR columns', () => {
  const row = {
    relation_1: 'is hetzelfde als', stim_3_id: '2', relation_2: 'is hetzelfde als', stim_4_id: '3',
    stim_5_id: '', relation_3: '', stim_6_id: '', q_stim_1_id: '1', q_rel: 'hetzelfde als', q_stim_2_id: '3',
    correct_response: 'yes', stage: '5', NAARR_1: 'static/dog-1.PNG', NAARR_2: 'static/dog-4.PNG', NAARR_3: 'static/dog-7.PNG', q_word: '',
  };
  assert.equal(trialKind(row), 'standard');
  const t = resolveTrial(row, pool, lang);
  assert.equal(t.propositions.length, 2);
  assert.deepEqual(t.propositions[0], { left: 'LAH', rel: 'is hetzelfde als', right: 'JAX', relClass: 'rel-same', hintLeft: 'static/dog-1.PNG', hintRight: 'static/dog-4.PNG' });
  assert.deepEqual(t.propositions[1], { left: 'JAX', rel: 'is hetzelfde als', right: 'CET', relClass: 'rel-same', hintLeft: 'static/dog-4.PNG', hintRight: 'static/dog-7.PNG' });
  assert.equal(t.question.word, 'Is');
  assert.equal(t.question.left, 'LAH');
  assert.equal(t.question.right, 'CET');
  assert.equal(t.correctResponse, 'yes');
  assert.equal(t.hint.available, true);
  assert.equal(t.hint.images.length, 6);
});

test('containment-style rows with explicit stim_1_id/stim_2_id and q_word', () => {
  const row = { stim_1_id: '4', relation_1: 'zit in', stim_2_id: '3', stim_3_id: '1', relation_2: 'bevat', stim_4_id: '2', q_stim_1_id: '1', q_rel: '', q_stim_2_id: '2', correct_response: 'yes', q_word: 'Bevat', stage: '103' };
  const t = resolveTrial(row, pool, lang);
  assert.equal(t.propositions[0].left, 'SUR');
  assert.equal(t.propositions[0].right, 'CET');
  assert.equal(t.question.word, 'Bevat');
  assert.equal(t.hint.available, false);
});

test('math trial layout', () => {
  const row = { relation_1: 'plus', meta_relation_1: 'is hetzelfde als', relation_2: 'plus', meta_stim_1_id: '1', meta_relation_2: 'is meer dan', meta_stim_2_id: '3', q_stim_1_id: '2', q_rel: 'meer dan', q_stim_2_id: '4', correct_response: 'no', stage: '104', q_word: 'Is', hint_text: 'Denk aan de som' };
  assert.equal(trialKind(row), 'math');
  const t = resolveTrial(row, pool, lang);
  assert.deepEqual(t.lines.map((l) => l.text), ['LAH plus JAX', 'is hetzelfde als', 'CET plus SUR', 'LAH is meer dan CET']);
  assert.equal(t.question.left, 'JAX');
  assert.equal(t.question.right, 'SUR');
  assert.equal(t.hint.available, true);
  assert.equal(t.hint.text, 'Denk aan de som');
});
