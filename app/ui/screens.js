import { $, $$, render, fill, sleep, waitClick, waitChoice, escapeHtml, requestFullscreen } from './dom.js';
import { play } from './audio.js';
import { USERNAME_RE, PIN_RE, normalizeUsername } from '../data/index.js';

const PROFESSOR = 'static/Professor.png';

/** Professor-style narrative screen: professor left, text (+optional picture) right, one button. */
export async function professor({ html, image, imageClass = 'side-image', button, extra = '' }) {
  render(`
    <div class="introduction-central-container">
      <div class="inner-main-divs"><img src="${PROFESSOR}" alt="" class="professor-image"></div>
      <div class="inner-main-divs narrative">
        <p>${html}</p>
        ${image ? `<img src="${escapeHtml(image)}" alt="" class="${imageClass}">` : ''}
        ${extra}
        ${button ? `<br><button class="continue-button" id="continue">${button}</button>` : ''}
      </div>
    </div>`);
  if (button) await waitClick('#continue');
}

export async function fullscreenPrompt(strings) {
  render(`<div class="centered"><button class="continue-button big" id="continue">${strings.ui.fullscreen}</button></div>`);
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
            <button class="continue-button" id="submit" type="submit">${mode === 'login' ? L.loginButton : L.registerButton}</button>
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
      <p><b>${fill(strings.collection.title, { part })}</b><br>${strings.collection.body}</p>
      <div id="dragonGrid"></div>
      <button class="continue-button" id="continue">${strings.ui.continue}</button>
    </div>`);
  const grid = $('#dragonGrid');
  for (const d of dragons) {
    const div = document.createElement('div');
    div.className = 'dragon';
    const img = document.createElement('img');
    img.src = d.image;
    img.alt = d.name;
    if (stage < d.stage) img.classList.add('locked');
    div.appendChild(img);
    grid.appendChild(div);
  }
  await waitClick('#continue');
}

const relSpan = (rel, cls) => `<span class="rel ${cls || ''}">${escapeHtml(rel)}</span>`;
const hintImg = (src) => (src ? `<img src="${escapeHtml(src)}" class="hint-img" alt="">` : '');

function trialBodyHtml(trial, { questionWordFirst = true } = {}) {
  if (trial.kind === 'math') {
    return `<div class="trial-propositions">${trial.lines.map((l) => `<div class="trial-proposition">${l.relClass ? relSpan(l.text, l.relClass) : escapeHtml(l.text)}</div>`).join('')}</div>
      <div class="trial-question">${escapeHtml(trial.question.word)} ${escapeHtml(trial.question.left)} ${relSpan(trial.question.rel, trial.question.relClass)} ${escapeHtml(trial.question.right)}?</div>`;
  }
  return `<div class="trial-propositions">${trial.propositions.map((p) => `<div class="trial-proposition">${escapeHtml(p.left)} ${relSpan(p.rel, p.relClass)} ${escapeHtml(p.right)}</div>`).join('')}</div>
    <div class="trial-question">${escapeHtml(trial.question.word)} ${escapeHtml(trial.question.left)} ${relSpan(trial.question.rel, trial.question.relClass)} ${escapeHtml(trial.question.right)}?</div>`;
}

function hintBoxHtml(trial) {
  const q = trial.question;
  let rows = '';
  if (trial.kind === 'standard' && trial.hint.images.length) {
    rows = trial.propositions.map((p) => `<div class="hint-row">${hintImg(p.hintLeft)} ${relSpan(p.rel, p.relClass)} ${hintImg(p.hintRight)}</div>`).join('')
      + `<div class="hint-row"><i>${escapeHtml(q.word)} ${hintImg(q.hintLeft)} ${relSpan(q.rel, q.relClass)} ${hintImg(q.hintRight)}?</i></div>`;
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
  const yesBtn = `<div class="response-option" id="yes"><b>${strings.yes}</b></div>`;
  const noBtn = `<div class="response-option" id="no"><b>${strings.no}</b></div>`;
  const showHint = hintEnabled && t.hint.available;
  render(`
    <div class="trial-layout">
      <div class="trial-left">
        ${trialBodyHtml(t)}
        <div class="footer-trials"><div class="response-options">${yesFirst ? yesBtn + noBtn : noBtn + yesBtn}</div></div>
      </div>
      ${showHint ? `<div class="trial-right"><button id="hint-button" class="hint-button">${strings.ui.hintButton}</button><div id="hint-box" class="hint-box" hidden>${hintBoxHtml(t)}</div></div>` : ''}
    </div>`);
  let usedHint = false;
  if (showHint) {
    $('#hint-button').addEventListener('click', () => {
      $('#hint-box').hidden = false;
      $('#hint-button').disabled = true;
      $('.trial-layout').classList.add('hint-colors-on');
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
  render(`<div class="feedback-text-${kind}"><p>${text}</p>${note ? `<p class="hint-note">${note}</p>` : ''}</div>`);
  await sleep(ms);
}

/** Corrective feedback after an error in training: the trial again, coloured, with the answer. */
export async function corrective({ trial: t, strings, header }) {
  header?.hideTimer();
  const answer = t.correctResponse === 'yes' ? strings.yes : strings.no;
  const hint = hintBoxHtml(t);
  render(`
    <div class="trial-layout hint-colors-on corrective">
      <div class="trial-left">${trialBodyHtml(t)}</div>
      ${hint ? `<div class="trial-right"><div class="hint-box">${hint}</div></div>` : ''}
    </div>
    <div class="corrective-answer"><b>${fill(strings.feedback.correctAnswerIs, { answer })}</b></div>
    <div class="centered"><button class="continue-button" id="continue">${strings.ui.continue}</button></div>`);
  await waitClick('#continue');
}

export async function battleIntro({ strings, current, next, testTrials }) {
  await professor({ html: fill(strings.battleIntro, { dragon: current.name, next: next.name, testTrials }), image: next.image, button: strings.ui.continue });
}

export async function battleAnimation({ strings, current, next, ms }) {
  render(`
    <div class="battle-screen">
      <p class="battle-title">${strings.battleTitle}</p>
      <div class="battle">
        <img src="${escapeHtml(current.image)}" class="Dragon-battle current" alt="">
        <img src="${escapeHtml(next.image)}" class="Dragon-battle new" alt="">
        <div class="explosion" hidden></div>
      </div>
    </div>`);
  const cur = $('.Dragon-battle.current'), nw = $('.Dragon-battle.new'), ex = $('.explosion');
  setTimeout(() => {
    cur.style.transform = 'translateX(150px)';
    nw.style.transform = 'translateX(-150px)';
    setTimeout(() => {
      ex.hidden = false;
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
    <div class="centered result">
      <p id="result-text">${fill(strings.battleWon, { dragon: current.name, next: next.name })}</p>
      <button class="continue-button" id="continue">${fill(strings.catchButton, { next: next.name })}</button>
    </div>`);
  await waitClick('#continue');
}

export async function catchAnimation({ strings, current, next, ms }) {
  render(`
    <div class="centered result">
      <p id="result-text">${fill(strings.battleWon, { dragon: current.name, next: next.name })}</p>
      <img id="Dragon" src="${escapeHtml(next.image)}" alt="" class="Dragon">
      <img id="stone" src="static/Dragonstone.png" alt="" class="stone-throw hidden">
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
  await professor({ html: strings.completed, image: 'static/the_gang.png', imageClass: 'side-image wide', button: strings.ui.continue });
}
