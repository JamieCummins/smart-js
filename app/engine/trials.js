import { shuffle } from './random.js';

/**
 * Draws trial rows the way lab.js "draw-shuffle" sampling did: the stage's
 * rows are shuffled and dealt out; when exhausted they are reshuffled, so a
 * level can run indefinitely until the criterion is met.
 */
export class TrialSampler {
  constructor(rows, rng = Math.random) {
    if (!rows.length) throw new Error('TrialSampler needs at least one row');
    this.rows = rows;
    this.rng = rng;
    this.queue = [];
  }

  next() {
    if (!this.queue.length) {
      let q = shuffle(this.rows, this.rng);
      // avoid dealing the same row twice in a row across a reshuffle
      if (this.last && q.length > 1 && q[0] === this.last) q.push(q.shift());
      this.queue = q;
    }
    this.last = this.queue.shift();
    return this.last;
  }
}

/** A row describes a "mathematical" (meta-relational) trial when it has meta_relation columns. */
export function trialKind(row) {
  return row.meta_relation_1 !== undefined && row.meta_relation_1 !== '' ? 'math' : 'standard';
}

const num = (v) => (v === '' || v == null ? null : Number(v));

/**
 * Turn a CSV row plus the current syllables into a renderable trial.
 *
 * `pool.slot(n)` gives the syllable for stimulus id n (1..4).
 * `lang` supplies relationClass(rel) for colouring and defaultQuestionWord.
 */
export function resolveTrial(row, pool, lang) {
  const kind = trialKind(row);
  const stim = (id, fallback) => {
    const n = num(id);
    return n ? pool.slot(n) : fallback ? pool.slot(fallback) : '';
  };
  const hintImg = (id, fallback) => {
    const n = num(id) || fallback;
    return n ? row[`NAARR_${n}`] || '' : '';
  };
  const relClass = (rel) => (lang && lang.relationClass ? lang.relationClass(rel) : '');

  const questionWord = row.q_word || (lang && lang.defaultQuestionWord) || '';
  const hintText = row.hint_text || '';

  if (kind === 'math') {
    // Layout used by the original "mathematical_trials" screen:
    //   A rel1 B          (e.g. "A plus B")
    //   meta_relation_1   (e.g. "is the same as")
    //   C rel2 D          (e.g. "C plus D")
    //   metaStim1 meta_relation_2 metaStim2
    // Q: q_word qStim1 q_rel qStim2 ?
    const lines = [
      { text: `${pool.slot(1)} ${row.relation_1} ${pool.slot(2)}` },
      { text: row.meta_relation_1, relClass: relClass(row.meta_relation_1) },
      { text: `${pool.slot(3)} ${row.relation_2} ${pool.slot(4)}` },
      { text: `${stim(row.meta_stim_1_id)} ${row.meta_relation_2} ${stim(row.meta_stim_2_id)}`, relClass: relClass(row.meta_relation_2) },
    ];
    return {
      kind,
      lines,
      question: { word: questionWord, left: stim(row.q_stim_1_id), rel: row.q_rel, right: stim(row.q_stim_2_id), relClass: relClass(row.q_rel) },
      correctResponse: row.correct_response,
      hint: { images: [], text: hintText, available: Boolean(hintText) },
      stimuli: [1, 2, 3, 4].map((n) => pool.slot(n)),
    };
  }

  // standard relational trial: up to four propositions (stim_1..stim_8)
  const propositions = [];
  const pairs = [
    ['stim_1_id', 'relation_1', 'stim_2_id', 1, 2],
    ['stim_3_id', 'relation_2', 'stim_4_id'],
    ['stim_5_id', 'relation_3', 'stim_6_id'],
    ['stim_7_id', 'relation_4', 'stim_8_id'],
  ];
  for (const [l, relKey, r, fl, fr] of pairs) {
    const rel = row[relKey];
    if (!rel) continue;
    propositions.push({
      left: stim(row[l], fl), rel, right: stim(row[r], fr), relClass: relClass(rel),
      hintLeft: hintImg(row[l], fl), hintRight: hintImg(row[r], fr),
    });
  }
  const question = {
    word: questionWord,
    left: stim(row.q_stim_1_id), rel: row.q_rel, right: stim(row.q_stim_2_id), relClass: relClass(row.q_rel),
    hintLeft: hintImg(row.q_stim_1_id), hintRight: hintImg(row.q_stim_2_id),
  };
  const images = propositions.flatMap((p) => [p.hintLeft, p.hintRight]).concat([question.hintLeft, question.hintRight]).filter(Boolean);
  return {
    kind,
    propositions,
    question,
    correctResponse: row.correct_response,
    hint: { images, text: hintText, available: images.length > 0 || Boolean(hintText) },
    stimuli: [1, 2, 3, 4].map((n) => pool.slot(n)),
  };
}
