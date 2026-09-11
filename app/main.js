import baseConfig, { mergeConfig } from './config.js';
import { createContent, indexStages, indexDragons, levelOptions } from './engine/content.js';
import { StimulusPool, bucketsFromRows } from './engine/stimuli.js';
import { TrialSampler, resolveTrial } from './engine/trials.js';
import { LevelRunner } from './engine/level.js';
import { createBackend } from './data/index.js';
import { createTrialQueue } from './data/queue.js';
import { uuid } from './data/storage.js';
import { createHeader } from './ui/header.js';
import { preloadAudio } from './ui/audio.js';
import { $, render, fill } from './ui/dom.js';
import * as screens from './ui/screens.js';

const params = new URLSearchParams(location.search);
const DEBUG = params.has('debug');

async function boot() {
  let config = baseConfig;
  if (DEBUG) config = mergeConfig(config, config.debug);
  if (params.get('backend') === 'local') config = mergeConfig(config, { backend: { type: 'local' } });
  if (params.get('api')) config = mergeConfig(config, { backend: { type: 'rest', url: params.get('api') } });
  if (DEBUG && params.get('sessionSec')) config = mergeConfig(config, { session: { durationSec: Number(params.get('sessionSec')) } });

  const lang = config.languages.includes(params.get('lang')) ? params.get('lang') : config.language;
  const strings = (await import(`./i18n/${lang}.js`)).default;
  document.documentElement.lang = lang;

  const content = createContent({ fetchText: (url) => fetch(url).then((r) => { if (!r.ok) throw new Error(`${r.status} ${url}`); return r.text(); }) });
  const [stageRows, dragonRows, syllableRows] = await Promise.all([content.stages(), content.dragons(), content.syllables()]);
  const stages = indexStages(stageRows);
  const dragons = indexDragons(dragonRows, lang);
  const backend = createBackend(config, { firstStage: stages.first });
  const header = createHeader({ strings, config });
  preloadAudio();

  const ctx = { config, strings, lang, content, stages, dragons, backend, header, syllableRows };
  if (DEBUG) setupDebugPanel(ctx);

  await screens.fullscreenPrompt(strings);

  // --- account --------------------------------------------------------------
  await backend.init();
  let user = await backend.restore();
  if (!user) user = await screens.loginScreen({ strings, backend, language: lang, studyCodeRequired: backend.requiresStudyCode });
  ctx.user = user;
  let stage0 = Math.min(Math.max(Number(user.stage) || stages.first, stages.first), stages.last + 1);
  if (DEBUG && params.get('stage')) stage0 = Math.min(Math.max(Number(params.get('stage')), stages.first), stages.last); // preview a level

  // --- narrative intro -------------------------------------------------------
  const firstDragon = dragons.get(stages.first);
  const currentDragon = dragons.get(Math.min(stage0, stages.last));
  if (user.isNew) {
    const p = { dragon: firstDragon.name, fact: firstDragon.fact, criterion: config.training.criterion, testTrials: config.testing.trials };
    for (let i = 0; i < strings.intro.length; i++) {
      const extra = i === 0 ? '<img src="static/Dragonstone.png" class="stone-intro" alt="">' : '';
      await screens.professor({ html: fill(strings.intro[i], p), image: i === 1 ? firstDragon.image : null, button: strings.ui.continue, extra });
    }
  } else {
    await screens.professor({ html: fill(strings.welcomeBack, { dragon: currentDragon.name }), image: currentDragon.image, button: strings.ui.continue });
  }
  await screens.professor({ html: fill(strings.beginTraining, { minutes: Math.round(config.session.durationSec / 60) }), button: strings.ui.beginTraining });

  // --- session --------------------------------------------------------------
  const result = await runSession(ctx, stage0);

  header.hide();
  $('#session-footer').hidden = true;
  await backend.logout(); // next child on this computer gets the login screen
  if (result.stage > stages.last) await screens.completed({ strings });
  await screens.ending({ strings, current: dragons.get(Math.min(result.stage, stages.last)) });
}

async function runSession(ctx, startStage) {
  const { config, strings, lang, content, stages, dragons, backend, header } = ctx;
  const sessionId = uuid();
  const session = {
    id: sessionId, stage: startStage, language: lang, startedAt: new Date().toISOString(),
    userAgent: navigator.userAgent, screen: `${screen.width}x${screen.height}`, viewport: `${innerWidth}x${innerHeight}`, debug: DEBUG,
  };
  backend.startSession(session).catch((e) => console.warn('startSession failed', e));
  const queue = createTrialQueue(backend, { username: ctx.user.username, batchSize: config.data.batchSize, flushIntervalMs: config.data.flushIntervalMs, onStatus: (s) => { ctx.queueStatus = s; } });
  queue.start();
  ctx.queue = queue;

  const unload = (e) => { e.preventDefault(); e.returnValue = strings.ui.unloadWarning; return strings.ui.unloadWarning; };
  window.addEventListener('beforeunload', unload);

  const pool = new StimulusPool(bucketsFromRows(ctx.syllableRows));
  header.show();
  header.startMotivations();
  const clock = header.startSessionClock(config.session.durationSec);
  ctx.clock = clock;

  let stage = startStage;
  let levelsPassed = 0;
  let trialsCompleted = 0;
  let seq = 0;

  // dragon collection for the current family of stages
  if (stage <= stages.last) {
    const family = stages.get(stage).family;
    const part = stages.families.indexOf(family) + 1;
    const familyStages = new Set(stages.list.filter((s) => s.family === family).map((s) => s.stage));
    header.hideHeaderOnly();
    await screens.collection({ strings, dragons: dragons.list.filter((d) => familyStages.has(d.stage)), stage, part });
  }

  while (!clock.expired && stage <= stages.last) {
    const passed = await runLevel(ctx, { stage, pool, clock, record: (r) => { seq++; trialsCompleted++; queue.push({ ...r, sessionId, seq, userId: ctx.user.id, username: ctx.user.username }); } });
    if (passed) {
      stage++;
      levelsPassed++;
      backend.saveProgress({ stage, extra: { lastDragon: dragons.get(Math.min(stage, stages.last)).name } }).catch((e) => console.warn('saveProgress failed', e));
    }
  }

  window.removeEventListener('beforeunload', unload);
  header.stopAll();
  await queue.flush();
  queue.stop();
  const summary = { endedAt: new Date().toISOString(), stageEnd: stage, levelsPassed, trialsCompleted, endReason: stage > stages.last ? 'completed' : 'time' };
  try { await backend.endSession(sessionId, summary); } catch (e) { console.warn('endSession failed', e); }
  return { stage, levelsPassed };
}

/** Run one level (training then testing). Resolves true when passed, false when the session clock ran out. */
async function runLevel(ctx, { stage, pool, clock, record }) {
  const { config, strings, lang, content, stages, dragons, header } = ctx;
  const stageRow = stages.get(stage);
  const rows = await content.trials(lang, stage);
  if (stage < stages.last) content.prefetchTrials(lang, stage + 1);
  const sampler = new TrialSampler(rows);
  const opts = levelOptions(config, stageRow);
  const level = new LevelRunner(opts);
  const current = dragons.get(stage);
  const next = dragons.get(stage + 1) || current;
  ctx.level = level;
  ctx.stage = stage;

  header.setBackground(stageRow.background);
  header.setDragons(current.image, next.image);

  const showTrainingHeader = () => { header.show(); header.setLevel(stage, 'training'); header.setTraining(level.tally, opts.criterion); };
  const showTestingHeader = () => { header.show(); header.setLevel(stage, 'testing'); header.setTesting(level.testTrialNumber, opts.testTrials); };

  while (!clock.expired) {
    const phase = level.phase;
    if (phase === 'training') showTrainingHeader(); else showTestingHeader();

    const row = sampler.next();
    const t = resolveTrial(row, pool, strings);
    const timeoutMs = config.session.endMidTrial ? Math.min(config.trial.timeoutMs, clock.remainingMs) : config.trial.timeoutMs;
    const shownAt = new Date().toISOString();
    const r = await screens.trial({
      trial: t, strings, timeoutMs, header,
      hintEnabled: phase === 'training' && config.training.hintEnabled,
      randomizePositions: config.trial.randomizeResponsePositions,
      autoAnswer: ctx.autoAnswer,
    });
    if (r.timedOut && clock.expired && config.session.endMidTrial) break;

    const correct = !r.timedOut && r.response === t.correctResponse;
    const event = level.record({ correct, usedHint: r.usedHint, timedOut: r.timedOut });
    record({
      stage, phase, trialType: t.kind, trialInLevel: level.trialsInLevel, testTrial: phase === 'testing' ? level.testTrial : null,
      stimuli: t.stimuli, row, question: `${t.question.word} ${t.question.left} ${t.question.rel} ${t.question.right}?`,
      correctResponse: t.correctResponse, response: r.response, correct: correct ? 1 : 0, rtMs: r.rtMs,
      usedHint: r.usedHint ? 1 : 0, timedOut: r.timedOut ? 1 : 0, tallyAfter: level.tally, levelEvent: event, positions: r.positions,
      shownAt, clientTime: new Date().toISOString(), criterion: opts.criterion, testTrials: opts.testTrials,
    });
    pool.next();

    if (phase === 'training') {
      if (correct) {
        if (r.usedHint && config.training.hintForfeitsStone) await screens.flash({ kind: 'correct', text: strings.feedback.correct, note: strings.feedback.correctHint, ms: config.feedback.correctHintMs });
        else { header.setTraining(level.tally, opts.criterion); await screens.flash({ kind: 'correct', text: strings.feedback.correct, ms: config.feedback.correctMs }); }
      } else {
        header.setTraining(level.tally, opts.criterion);
        await screens.flash({ kind: 'incorrect', text: strings.feedback.incorrect, ms: config.feedback.incorrectMs });
        if (config.feedback.showCorrective) await screens.corrective({ trial: t, strings, header });
      }
    }

    if (event === 'toTesting') {
      header.hideHeaderOnly();
      await screens.battleIntro({ strings, current, next, testTrials: opts.testTrials });
    } else if (event === 'passed') {
      header.hideHeaderOnly();
      await screens.battleAnimation({ strings, current, next, ms: config.battle.animationMs });
      await screens.battleWon({ strings, current, next });
      await screens.catchAnimation({ strings, current, next, ms: config.battle.catchMs });
      await screens.caught({ strings, next });
      return true;
    } else if (event === 'failed') {
      header.hideHeaderOnly();
      await screens.battleAnimation({ strings, current, next, ms: config.battle.animationMs });
      await screens.battleLost({ strings, current, next });
    }
  }
  return false;
}

function setupDebugPanel(ctx) {
  const panel = $('#debug-panel');
  panel.hidden = false;
  document.body.classList.add('debug');
  const draw = () => {
    const l = ctx.level;
    panel.innerHTML = `
      <b>debug</b> · backend: ${ctx.backend.type} · lang: ${ctx.lang}
      · stage: ${ctx.stage ?? '-'} · phase: ${l?.phase ?? '-'} · tally: ${l?.tally ?? '-'} · test: ${l?.testTrial ?? '-'}
      · uploads pending: ${ctx.queue?.pending ?? 0} · time left: ${ctx.clock ? Math.round(ctx.clock.remainingMs / 1000) + 's' : '-'}
      <label><input type="checkbox" id="dbg-auto" ${ctx.autoAnswer ? 'checked' : ''}> auto-answer correctly</label>
      ${ctx.backend.exportCsv ? '<button id="dbg-export">download trial csv</button>' : ''}
      <button id="dbg-logout">log out</button>`;
    $('#dbg-auto').onchange = (e) => { ctx.autoAnswer = e.target.checked; };
    $('#dbg-logout').onclick = async () => { await ctx.backend.logout(); location.reload(); };
    if ($('#dbg-export')) $('#dbg-export').onclick = () => {
      const csv = ctx.backend.exportCsv();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
      a.download = `smart-trials-${ctx.user?.username || 'local'}.csv`;
      a.click();
    };
  };
  draw();
  setInterval(draw, 1000);
}

boot().catch((e) => {
  console.error(e);
  render(`<div class="centered"><p class="form-error">${e.message || e}</p></div>`);
});
