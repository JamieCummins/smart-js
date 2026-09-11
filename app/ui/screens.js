import { $, $$, render, fill, sleep, waitClick, waitChoice, escapeHtml, requestFullscreen } from './dom.js';
import { play } from './audio.js';
import { USERNAME_RE, PIN_RE, normalizeUsername } from '../data/index.js';

const PROFESSOR = 'static/Professor.png';

/** Professor-style narrative screen: professor avatar, speech card, optional picture, one button. */
export async function professor({ html, image, imageClass = 'story-image', button, extra = '' }) {
  render(`
    <div class="story">
      <div class="story-professor"><img src="${PROFESSOR}" alt=""></div>
      <div class="story-card">
        <div class="story-text">${html}</div>
        ${image ? `<img src="${escapeHtml(image)}" alt="" class="${imageClass}">` : ''}
        ${extra}
        ${button ? `<div class="story-actions"><button class="btn btn-primary" id="continue">${button}</button></div>` : ''}
      </div>
    </div>`);
  if (button) await waitClick('#continue');
}

export async function fullscreenPrompt(strings) {
  render(`
    <div class="centered splash">
      <img src="static/Dragonstone.png" alt="" class="splash-logo">
      <h1>SMART</h1>
      <button class="btn btn-primary btn-lg" id="continue">${strings.ui.fullscreen}</button>
    </div>`);
  await waitClick('#continue');
  requestFullscreen();
}

/** Login / register form. Resolves with the user object from the backend. */
export function loginScreen({ strings, backend, language, studyCodeRequired }) {
  const L = strings.login;
  return new Promise((resolve) => {
    let mode = 'login';
    const draw = () => {
      render(`
        <div class="login-box">
          <img src="static/Professor.png" alt="" class="login-avatar">
          <h2>${L.title}</h2>
          <p>${L.intro}</p>
          <div class="tabs">
            <button class="tab ${mode === 'login' ? 'active' : ''}" data-mode="login">${L.tabLogin}</button>
            <button class="tab ${mode === 'register' ? 'active' : ''}" data-mode="register">${L.tabRegister}</button>
          </div>
          <form id="login-form" autocomplete="off">
            <label>${L.username}<input name="username" type="text" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="32" required>
              <small>${L.usernameHelp}</small></label>
            <label>${L.pin}<input name="pin" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" required>
              ${mode === 'register' ? `<small>${L.pinHelp}</small>` : ''}</label>
            ${mode === 'register' ? `<label>${L.pinRepeat}<input name="pin2" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" required></label>` : ''}
            ${mode === 'register' && studyCodeRequired ? `<label>${L.studyCode}<input name="studyCode" type="text" autocapitalize="none" required><small>${L.studyCodeHelp}</small></label>` : ''}
            <div class="form-error" id="form-error" hidden></div>
            <button class="btn btn-primary" id="submit" type="submit">${mode === 'login' ? L.loginButton : L.registerButton}</button>
          </form>
        </div>`);
      $$('.tab').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.mode; draw(); }));
      $('#login-form').addEventListener('submit', onSubmit);
      $('input[name=username]').focus();
    };
    const showError = (code) => {
      const el = $('#form-error');
      el.textContent = L.errors[code] || strings.ui.error;
      el.hidden = false;
      $('#submit').disabled = false;
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const username = normalizeUsername(f.get('username'));
      const pin = String(f.get('pin') || '').trim();
      if (!USERNAME_RE.test(username)) return showError('username');
      if (!PIN_RE.test(pin)) return showError('pin');
      if (mode === 'register' && pin !== String(f.get('pin2') || '').trim()) return showError('pinMismatch');
      $('#submit').disabled = true;
      try {
        const user = mode === 'login'
          ? await backend.login({ username, pin })
          : await backend.register({ username, pin, language, studyCode: String(f.get('studyCode') || '').trim() });
        resolve(user);
      } catch (err) {
        showError(err.code || 'server');
      }
    };
    draw();
  });
}

/** Dragon collection overview for one family of stages. */
export async function collection({ strings, dragons, stage, part }) {
  render(`
    <div class="collection">
      <div class="collection-head">
        <h2>${fill(strings.collection.title, { part })}</h2>
        <p>${strings.collection.body}</p>
      </div>
      <div id="dragonGrid" class="dragon-grid"></div>
      <div class="story-actions"><button class="btn btn-primary" id="continue">${strings.ui.continue}</button></div>
    </div>`);
  const grid = $('#dragonGrid');
  for (const d of dragons) {
    const locked = stage < d.stage;
    const card = document.createElement('div');
    card.className = 'dragon-card' + (locked ? ' locked' : '');
    card.innerHTML = `<div class="dragon-pic"><img src="${escapeHtml(d.image)}" alt="${escapeHtml(d.name)}">${locked ? '<span class="lock">🔒</span>' : ''}</div><div class="dragon-name">${locked ? '???' : escapeHtml(d.name)}</div>`;
    grid.appendChild(card);
  }
  await waitClick('#continue');
}

const relSpan = (rel, cls) => `<span class="rel ${cls || ''}">${escapeHtml(rel)}</span>`;
const hintImg = (src) => (src ? `<img src="${escapeHtml(src)}" class="hint-img" alt="">` : '');

function trialBodyHtml(trial) {
  const q = trial.question;
  const question = `<div class="question">${escapeHtml(q.word)} ${escapeHtml(q.left)} ${relSpan(q.rel, q.relClass)} ${escapeHtml(q.right)}?</div>`;
  if (trial.kind === 'math') {
    return `<div class="propositions">${trial.lines.map((l) => `<div class="prop ${l.relClass ? 'prop-meta' : ''}">${l.relClass ? relSpan(l.text, l.relClass) : escapeHtml(l.text)}</div>`).join('')}</div>${question}`;
  }
  return `<div class="propositions">${trial.propositions.map((p) => `<div class="prop">${escapeHtml(p.left)} ${relSpan(p.rel, p.relClass)} ${escapeHtml(p.right)}</div>`).join('')}</div>${question}`;
}

function hintBoxHtml(trial) {
  const q = trial.question;
  let rows = '';
  if (trial.kind === 'standard' && trial.hint.images.length) {
    rows = trial.propositions.map((p) => `<div class="hint-row">${hintImg(p.hintLeft)} ${relSpan(p.rel, p.relClass)} ${hintImg(p.hintRight)}</div>`).join('')
      + `<div class="hint-row hint-question">${escapeHtml(q.word)} ${hintImg(q.hintLeft)} ${relSpan(q.rel, q.relClass)} ${hintImg(q.hintRight)}?</div>`;
  }
  if (trial.hint.text) rows += `<div class="hint-text">${trial.hint.text}</div>`;
  return rows;
}

/**
 * Present one trial. Resolves with {response, rtMs, usedHint, timedOut, positions}.
 * `timeoutMs` ends the trial; `hintEnabled` adds the hint button (training only).
 */
export async function trial({ trial: t, strings, timeoutMs, hintEnabled, randomizePositions, header, autoAnswer }) {
  const yesFirst = randomizePositions ? Math.random() < 0.5 : true;
  const yesBtn = `<button class="answer answer-yes" id="yes"><span class="answer-icon">✓</span>${strings.yes}</button>`;
  const noBtn = `<button class="answer answer-no" id="no"><span class="answer-icon">✕</span>${strings.no}</button>`;
  const showHint = hintEnabled && t.hint.available;
  render(`
    <div class="trial-card">
      ${showHint ? `<button id="hint-button" class="hint-fab"><span class="hint-bulb">💡</span>${strings.ui.hintButton}</button>` : ''}
      ${trialBodyHtml(t)}
      ${showHint ? `<div id="hint-box" class="hint-panel" hidden>${hintBoxHtml(t)}</div>` : ''}
      <div class="answers">${yesFirst ? yesBtn + noBtn : noBtn + yesBtn}</div>
    </div>`);
  let usedHint = false;
  if (showHint) {
    $('#hint-button').addEventListener('click', () => {
      $('#hint-box').hidden = false;
      $('#hint-button').disabled = true;
      $('.trial-card').classList.add('hint-colors-on');
      usedHint = true;
    });
  }
  header?.startTrialTimer(timeoutMs);
  const shown = performance.now();
  if (autoAnswer) setTimeout(() => $(`#${t.correctResponse}`)?.dispatchEvent(new Event('pointerdown', { cancelable: true })), 150);
  const response = await waitChoice({ '#yes': 'yes', '#no': 'no' }, timeoutMs);
  const rtMs = performance.now() - shown;
  header?.stopTrialTimer();
  const timedOut = response === 'timeout';
  return { response: timedOut ? null : response, rtMs: Math.round(rtMs), usedHint, timedOut, positions: { yes: yesFirst ? 'left' : 'right', no: yesFirst ? 'right' : 'left' } };
}

/** Brief "Correct!" / "Oops!" overlay. */
export async function flash({ kind, text, note, ms }) {
  play(kind === 'correct' ? 'correct' : 'incorrect');
  render(`
    <div class="flash flash-${kind}">
      <div class="flash-icon">${kind === 'correct' ? '✓' : '✕'}</div>
      <div class="flash-text">${text}</div>
      ${note ? `<div class="flash-note">${note}</div>` : ''}
    </div>`);
  await sleep(ms);
}

/** Corrective feedback after an error in training: the trial again, coloured, with the answer. */
export async function corrective({ trial: t, strings, header }) {
  header?.hideTimer();
  const answer = t.correctResponse === 'yes' ? strings.yes : strings.no;
  const hint = hintBoxHtml(t);
  render(`
    <div class="trial-card hint-colors-on corrective">
      ${trialBodyHtml(t)}
      ${hint ? `<div class="hint-panel">${hint}</div>` : ''}
      <div class="answer-reveal ${t.correctResponse === 'yes' ? 'is-yes' : 'is-no'}">${fill(strings.feedback.correctAnswerIs, { answer: `<b>${answer}</b>` })}</div>
      <div class="story-actions"><button class="btn btn-primary" id="continue">${strings.ui.continue}</button></div>
    </div>`);
  await waitClick('#continue');
}

export async function battleIntro({ strings, current, next, testTrials }) {
  await professor({ html: fill(strings.battleIntro, { dragon: current.name, next: next.name, testTrials }), image: next.image, button: strings.ui.continue });
}

export async function battleAnimation({ strings, current, next, ms }) {
  render(`
    <div class="arena">
      <div class="arena-title">${strings.battleTitle}</div>
      <div class="battle">
        <img src="${escapeHtml(current.image)}" class="Dragon-battle current" alt="">
        <div class="vs">VS</div>
        <img src="${escapeHtml(next.image)}" class="Dragon-battle new" alt="">
        <div class="explosion" hidden></div>
      </div>
    </div>`);
  const cur = $('.Dragon-battle.current'), nw = $('.Dragon-battle.new'), ex = $('.explosion'), vs = $('.vs');
  setTimeout(() => {
    cur.style.transform = 'translateX(120px)';
    nw.style.transform = 'translateX(-120px)';
    setTimeout(() => {
      ex.hidden = false; vs.hidden = true;
      play('battle');
      setTimeout(() => { cur.style.visibility = 'hidden'; nw.style.visibility = 'hidden'; ex.hidden = true; }, 1000);
    }, 1000);
  }, 1000);
  await sleep(ms);
}

export async function battleLost({ strings, current, next }) {
  play('fail');
  await professor({ html: fill(strings.battleLost, { dragon: current.name, next: next.name }), button: strings.ui.continue });
}

export async function battleWon({ strings, current, next }) {
  play('fanfare');
  render(`
    <div class="arena result">
      <div class="result-card">
        <img src="${escapeHtml(current.image)}" alt="" class="result-dragon">
        <p id="result-text">${fill(strings.battleWon, { dragon: current.name, next: next.name })}</p>
        <button class="btn btn-primary btn-lg" id="continue">${fill(strings.catchButton, { next: next.name })}</button>
      </div>
    </div>`);
  await waitClick('#continue');
}

export async function catchAnimation({ strings, current, next, ms }) {
  render(`
    <div class="arena result">
      <div class="result-card">
        <p id="result-text">${fill(strings.battleWon, { dragon: current.name, next: next.name })}</p>
        <div class="catch-stage">
          <img id="Dragon" src="${escapeHtml(next.image)}" alt="" class="Dragon">
          <img id="stone" src="static/Dragonstone.png" alt="" class="stone-throw hidden">
        </div>
      </div>
    </div>`);
  setTimeout(() => {
    const stone = $('#stone'), dragon = $('#Dragon');
    play('catch');
    stone.classList.remove('hidden');
    stone.style.animation = 'throwStone 1s ease-out forwards';
    setTimeout(() => {
      dragon.style.visibility = 'hidden';
      stone.style.animation = 'stoneShake 1s ease-in-out 3';
      setTimeout(() => stone.classList.add('hidden'), 2000);
    }, 1000);
  }, 1000);
  await sleep(ms);
}

export async function caught({ strings, next }) {
  await professor({ html: fill(strings.caught, { next: next.name, fact: next.fact }), image: next.image, button: strings.ui.continue });
}

export async function ending({ strings, current }) {
  await professor({ html: fill(strings.ending, { dragon: current.name }), image: current.image });
}

export async function completed({ strings }) {
  await professor({ html: strings.completed, image: 'static/the_gang.png', imageClass: 'story-image wide', button: strings.ui.continue });
}
