#!/usr/bin/env node
/**
 * Generates content/trials/<target> from content/trials/<source> by
 * translating the relation words. The Dutch set is the canonical one
 * (it carries the NAARR hint-image columns), so by default nl -> en.
 *
 * Usage: node tools/translate-trials.js [source=nl] [target=en]
 *
 * To add a language: add a dictionary below (keys are exact cell values,
 * matched case-insensitively) and a matching app/i18n/<code>.js.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../app/engine/csv.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const [source = 'nl', target = 'en'] = process.argv.slice(2);

const dictionaries = {
  'nl>en': {
    relations: {
      'is hetzelfde als': 'is the same as', 'hetzelfde als': 'the same as',
      'is het tegenovergestelde van': 'is opposite to', 'het tegenovergestelde van': 'opposite to',
      'is meer dan': 'is more than', 'meer dan': 'more than',
      'is minder dan': 'is less than', 'minder dan': 'less than',
      'komt voor': 'comes before', 'komt na': 'comes after',
      voor: 'come before', na: 'come after',
      'zit in': 'is within', in: 'within',
      bevat: 'contains',
      plus: 'plus', min: 'minus',
    },
    questionWords: { Is: 'Is', Komt: 'Does', Zit: 'Is', Bevat: 'Does' },
    // "Bevat A B?" has an empty q_rel in Dutch; English needs "Does A contain B?"
    emptyQuestionRelation: { Bevat: 'contain' },
  },
};

const dict = dictionaries[`${source}>${target}`];
if (!dict) { console.error(`No dictionary for ${source}>${target}`); process.exit(1); }

const srcDir = path.join(ROOT, 'content/trials', source);
const outDir = path.join(ROOT, 'content/trials', target);
fs.mkdirSync(outDir, { recursive: true });

const relationCols = /^(relation_\d|meta_relation_\d|q_rel)$/;
const tr = (v) => {
  if (v === '') return '';
  const key = v.trim().toLowerCase();
  if (!(key in dict.relations)) throw new Error(`No translation for relation "${v}"`);
  return dict.relations[key];
};

let n = 0;
for (const file of fs.readdirSync(srcDir).filter((f) => /^stage_\d+\.csv$/.test(f))) {
  const rows = parseCsv(fs.readFileSync(path.join(srcDir, file), 'utf8'));
  const header = Object.keys(rows[0]);
  for (const r of rows) {
    const qWord = r.q_word;
    for (const c of header) {
      if (relationCols.test(c)) {
        if (c === 'q_rel' && r[c] === '' && dict.emptyQuestionRelation[qWord]) r[c] = dict.emptyQuestionRelation[qWord];
        else r[c] = tr(r[c]);
      }
    }
    if (qWord) {
      if (!(qWord in dict.questionWords)) throw new Error(`No translation for question word "${qWord}"`);
      r.q_word = dict.questionWords[qWord];
    }
  }
  fs.writeFileSync(path.join(outDir, file), toCsv(rows, header));
  n++;
}
console.log(`translated ${n} files ${source} -> ${target}`);
