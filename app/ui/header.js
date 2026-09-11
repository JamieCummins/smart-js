import { $, fill } from './dom.js';

/**
 * The persistent training chrome (HUD): dragon avatar + speech bubble,
 * level pill, dragon stones (training) or battle track (testing),
 * per-trial countdown ring, and the session progress bar.
 */
export function createHeader({ strings, config }) {
  const header = $('#header');
  const footer = $('#session-footer');
  const canvas = $('#timer-circle');
  const ctx = canvas.getContext('2d');
  const SIZE = 120;
  canvas.width = canvas.height = SIZE;
  let trialTimer = null;
  let motivationTimer = null;
  let sessionTimer = null;

  function drawRing(fraction, secondsLeft) {
    const c = SIZE / 2, r = SIZE / 2 - 9;
    const urgent = secondsLeft <= 10;
    ctx.clearRect(0, 0, SIZE, SIZE);
    // disc
    ctx.beginPath(); ctx.arc(c, c, SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill();
    // track
    ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(c, c, r, 0, Math.PI * 2); ctx.strokeStyle = '#e3eef5'; ctx.stroke();
    // remaining arc
    const remaining = Math.max(0, 1 - fraction);
    if (remaining > 0) {
      ctx.beginPath(); ctx.arc(c, c, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remaining);
      ctx.strokeStyle = urgent ? '#F68712' : '#00ADEF'; ctx.stroke();
    }
    ctx.font = '800 38px Nunito, Verdana, sans-serif'; ctx.fillStyle = urgent ? '#F68712' : '#0b6f8f';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(secondsLeft), c, c + 2);
  }

  const api = {
    show() { header.hidden = false; footer.hidden = false; },
    hide() { header.hidden = true; api.stopTrialTimer(); },
    hideHeaderOnly() { header.hidden = true; api.stopTrialTimer(); },

    setBackground(url) {
      $('#background').style.backgroundImage = url ? `url("${url}")` : 'none';
    },

    setLevel(stage, phase) {
      const phaseLabel = phase === 'testing' ? strings.header.testing : strings.header.training;
      $('#level-display').textContent = fill(strings.header.level, { stage, phase: phaseLabel });
      header.classList.toggle('phase-testing', phase === 'testing');
    },

    setDragons(currentImage, nextImage) {
      $('#current-character').src = currentImage;
      $('#track-dragon').src = currentImage;
      $('#target-character').src = nextImage || '';
    },

    /** Training view: dragon stones for the current tally. */
    setTraining(tally, criterion) {
      $('#test-track').hidden = true;
      $('.bubble', header).hidden = false;
      const box = $('#stone-container');
      box.hidden = false;
      box.style.setProperty('--cols', Math.min(criterion, 8));
      if (box.childElementCount !== criterion) {
        box.innerHTML = '';
        for (let i = 0; i < criterion; i++) {
          const img = document.createElement('img');
          img.src = 'static/Dragonstone.png';
          img.className = 'stone';
          img.alt = '';
          box.appendChild(img);
        }
      }
      [...box.children].forEach((el, i) => {
        const on = i < tally;
        if (on && !el.classList.contains('visible')) el.classList.add('pop');
        el.classList.toggle('visible', on);
      });
    },

    /** Testing view: "trial n of total" and the dragon advancing along the track. */
    setTesting(n, total) {
      $('#stone-container').hidden = true;
      $('.bubble', header).hidden = true;
      $('#test-track').hidden = false;
      $('#trial-display').textContent = fill(strings.header.testTrial, { n, total });
      const pct = total > 1 ? ((n - 1) / (total - 1)) * 100 : 0;
      $('#track-fill').style.width = `${pct}%`;
      $('#track-dragon').style.left = `${pct}%`;
    },

    setMotivation(text) { $('#dragon-motivation').innerHTML = text; },
    startMotivations() {
      api.setMotivation(strings.header.startMotivation);
      const list = strings.motivations;
      motivationTimer = setInterval(() => api.setMotivation(list[Math.floor(Math.random() * list.length)]), config.motivationIntervalMs);
    },

    startTrialTimer(totalMs) {
      api.stopTrialTimer();
      canvas.style.visibility = config.trial.showTimer ? 'visible' : 'hidden';
      canvas.style.opacity = '1';
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const left = Math.max(0, Math.ceil((totalMs - elapsed) / 1000));
        drawRing(Math.min(1, elapsed / totalMs), left);
      };
      tick();
      trialTimer = setInterval(tick, 100);
    },
    stopTrialTimer() { if (trialTimer) { clearInterval(trialTimer); trialTimer = null; canvas.style.opacity = '0.35'; } },
    hideTimer() { canvas.style.visibility = 'hidden'; },

    /** Session progress bar + minutes left. Returns a clock object with `expired` and `remainingMs`. */
    startSessionClock(durationSec) {
      const started = Date.now();
      const deadline = started + durationSec * 1000;
      const bar = $('#session-timer-bar');
      const label = $('#session-countdown');
      const tick = () => {
        const left = Math.max(0, deadline - Date.now());
        bar.style.width = `${((durationSec * 1000 - left) / (durationSec * 1000)) * 100}%`;
        label.textContent = left > 0 ? fill(strings.ui.minutesLeft, { n: Math.ceil(left / 60000) }) : strings.ui.finished;
        if (left <= 0) clearInterval(sessionTimer);
      };
      tick();
      sessionTimer = setInterval(tick, 1000);
      return {
        started,
        deadline,
        get remainingMs() { return Math.max(0, deadline - Date.now()); },
        get expired() { return Date.now() >= deadline; },
      };
    },

    stopAll() {
      api.stopTrialTimer();
      if (motivationTimer) clearInterval(motivationTimer);
      if (sessionTimer) clearInterval(sessionTimer);
    },
  };
  return api;
}
