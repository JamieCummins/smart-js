/**
 * Training configuration. Everything a researcher is likely to tune lives
 * here; per-stage overrides go in content/stages.csv.
 *
 * URL parameters override some values at runtime:
 *   ?lang=en            interface + trial language
 *   ?debug              apply `debug` overrides (short levels/session) and show the debug panel
 *   ?backend=local      force the browser-only backend (no server)
 *   ?api=https://...    REST backend base URL (overrides backend.url)
 *   ?study=draak2026    study code for registration; the field is hidden and the account is tagged with it
 *   ?stage=104          (debug only) start this session at a given stage, e.g. to preview a level
 *   ?sessionSec=90      (debug only) session length in seconds
 */
export default {
  // Default language; must have app/i18n/<code>.js and content/trials/<code>/.
  language: 'nl',
  languages: ['nl', 'en'],

  // Where accounts, progress and trial data are stored.
  //   type: 'local'  - this browser only (localStorage). Good for demos/testing.
  //   type: 'rest'   - a server implementing server/API.md (see server/cloudflare).
  backend: {
    type: 'rest',
    url: 'https://smart-api.zita-meijer.workers.dev',
    studyCode: '',     // study code sent at registration; usually left empty and supplied per study via ?study=CODE in the link
  },

  session: {
    durationSec: 1859,       // ~31 minutes, as in the original build
    endMidTrial: false,      // false: let the current trial finish when time runs out
  },

  trial: {
    timeoutMs: 30000,               // no answer within this time counts as incorrect
    randomizeResponsePositions: true,
    showTimer: true,
  },

  training: {
    criterion: 16,            // consecutive correct (no hint) answers needed to reach the test
    resetOnError: true,       // an error empties the dragon stones
    hintForfeitsStone: true,  // correct answer with a hint gives no stone
    hintEnabled: true,        // show the hint button in training when the trial has hint content
  },

  testing: {
    trials: 16,               // number of test trials; all must be correct
    abortOnFirstError: false, // true: stop the test at the first error instead of finishing all trials
  },

  feedback: {
    correctMs: 500,
    correctHintMs: 3500,
    incorrectMs: 500,
    showCorrective: true,     // after an error in training, show the trial again with the correct answer
  },

  battle: {
    animationMs: 3000,
    catchMs: 5000,
  },

  motivationIntervalMs: 60000, // how often the dragon's speech bubble changes

  data: {
    batchSize: 5,            // trials per upload
    flushIntervalMs: 15000,
  },

  // Overrides applied when the page is opened with ?debug
  debug: {
    training: { criterion: 2 },
    testing: { trials: 2 },
    session: { durationSec: 300 },
    feedback: { correctHintMs: 1000 },
  },
};

/** Deep-merge helper used for debug overrides. */
export function mergeConfig(base, extra) {
  const out = { ...base };
  for (const [k, v] of Object.entries(extra || {})) {
    out[k] = v && typeof v === 'object' && !Array.isArray(v) ? mergeConfig(base[k] || {}, v) : v;
  }
  return out;
}
