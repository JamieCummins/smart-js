import { parseCsv } from './csv.js';

/**
 * Loads and indexes the CSV content (stages, dragons, syllables, trials).
 * `fetchText(url)` is injectable so the same code runs in Node tests.
 */
export function createContent({ base = '', fetchText }) {
  const cache = new Map();
  const get = async (rel) => {
    if (!cache.has(rel)) cache.set(rel, fetchText(base + rel).then(parseCsv));
    return cache.get(rel);
  };
  return {
    stages: () => get('content/stages.csv'),
    dragons: () => get('content/dragons.csv'),
    syllables: () => get('content/syllables.csv'),
    trials: (lang, stage) => get(`content/trials/${lang}/stage_${stage}.csv`),
    prefetchTrials: (lang, stage) => { get(`content/trials/${lang}/stage_${stage}.csv`).catch(() => {}); },
  };
}

/** Index helpers over the CSV rows. */
export function indexStages(rows) {
  const byStage = new Map();
  for (const r of rows) byStage.set(Number(r.stage), { ...r, stage: Number(r.stage) });
  const list = [...byStage.values()].sort((a, b) => a.stage - b.stage);
  return {
    list,
    first: list[0]?.stage,
    last: list[list.length - 1]?.stage,
    get: (s) => byStage.get(Number(s)),
    families: [...new Set(list.map((r) => r.family))],
  };
}

export function indexDragons(rows, lang) {
  const byStage = new Map();
  for (const r of rows) {
    byStage.set(Number(r.stage), {
      stage: Number(r.stage),
      name: r.name,
      image: r.image,
      fact: r[`fact_${lang}`] || r.fact_en || r.fact_nl || '',
    });
  }
  return { get: (s) => byStage.get(Number(s)), list: [...byStage.values()].sort((a, b) => a.stage - b.stage) };
}

/** Per-stage overrides from stages.csv on top of the global config. */
export function levelOptions(config, stageRow) {
  const n = (v) => (v === undefined || v === '' ? undefined : Number(v));
  const b = (v) => (v === undefined || v === '' ? undefined : /^(1|true|yes)$/i.test(String(v)));
  return {
    criterion: n(stageRow?.training_criterion) ?? config.training.criterion,
    testTrials: n(stageRow?.testing_trials) ?? config.testing.trials,
    resetOnError: config.training.resetOnError,
    hintForfeitsPoint: config.training.hintForfeitsStone,
    abortOnFirstError: b(stageRow?.abort_on_first_error) ?? config.testing.abortOnFirstError,
  };
}
