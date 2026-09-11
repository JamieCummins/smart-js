import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createContent, indexStages, indexDragons, levelOptions } from '../app/engine/content.js';
import { trialKind, resolveTrial } from '../app/engine/trials.js';
import { StimulusPool, bucketsFromRows } from '../app/engine/stimuli.js';

const content = createContent({ base: new URL('../', import.meta.url).pathname, fetchText: (p) => fs.readFile(p, 'utf8') });

test('stages.csv and dragons.csv cover every stage', async () => {
  const stages = indexStages(await content.stages());
  const dragons = indexDragons(await content.dragons(), 'nl');
  assert.equal(stages.first, 5);
  assert.equal(stages.last, 122);
  for (const s of stages.list) {
    assert.ok(dragons.get(s.stage), `dragon for stage ${s.stage}`);
    assert.ok(s.background, `background for stage ${s.stage}`);
  }
  const cfg = { training: { criterion: 16, resetOnError: true, hintForfeitsStone: true }, testing: { trials: 16, abortOnFirstError: false } };
  assert.deepEqual(levelOptions(cfg, stages.get(5)), { criterion: 16, testTrials: 16, resetOnError: true, hintForfeitsPoint: true, abortOnFirstError: false });
});

for (const lang of ['nl', 'en']) {
  test(`every ${lang} trial file resolves without empty stimuli`, async () => {
    const stages = indexStages(await content.stages());
    const pool = new StimulusPool(bucketsFromRows(await content.syllables()));
    const strings = (await import(`../app/i18n/${lang}.js`)).default;
    for (const s of stages.list) {
      const rows = await content.trials(lang, s.stage);
      assert.ok(rows.length > 0, `${lang} stage ${s.stage} has rows`);
      for (const row of rows) {
        assert.ok(['yes', 'no'].includes(row.correct_response), `${lang} stage ${s.stage}: correct_response`);
        const t = resolveTrial(row, pool, strings);
        assert.ok(t.question.left && t.question.right && t.question.word, `${lang} stage ${s.stage}: question complete`);
        if (t.kind === 'standard') {
          assert.ok(t.propositions.length >= 1, `${lang} stage ${s.stage}: propositions`);
          for (const p of t.propositions) assert.ok(p.left && p.right, `${lang} stage ${s.stage}: proposition stimuli`);
        } else {
          for (const l of t.lines) assert.ok(!/undefined|  /.test(l.text), `${lang} stage ${s.stage}: math line "${l.text}"`);
        }
        assert.ok(strings.relationClass(row.q_rel || 'x') !== undefined);
      }
    }
  });
}
