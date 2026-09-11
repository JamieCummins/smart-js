import { $, fill } from './dom.js';

/**
 * The persistent training chrome: dragon + speech bubble, level/progress
 * display, per-trial countdown circle, and the session progress bar.
 */
export function createHeader({ strings, config }) {
  const header = $('#header');
  const footer = $('#session-footer');
  const canvas = $('#timer-circle');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.height = 100;
  let trialTimer = null;
  let motivationTimer = null;
  let sessionTimer = null;

  function drawCircle(fraction, secondsLeft) {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath(); ctx.moveTo(w / 2, h / 2); ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#03879E'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(w / 2, h / 2); ctx.arc(w / 2, h / 2, w / 2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * fraction);
    ctx.fillStyle = '#00ADEF'; ctx.fill();
    ctx.font = 'bold 30px Verdana, sans-serif'; ctx.fillStyle = 'white'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(secondsLeft), w / 2, h / 2 + 2);
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
    },

    setDragons(currentImage, nextImage) {
      $('#current-character').src = currentImage;
      $('#target-character').src = nextImage || '';
    },

    /** Training view: dragon stones for the current tally, speech bubble visible. */
    setTraining(tally, criterion) {
      $('#target-character').classList.add('hidden');
      $('#current-character').style.transform = 'translateX(0%)';
      $('.text-container', header).hidden = false;
      $('#trial-display').textContent = '';
      const box = $('#stone-container');
      box.innerHTML = '';
      for (let i = 0; i < criterion; i++) {
        const img = document.createElement('img');
        img.src = 'static/Dragonstone.png';
        img.className = 'stone' + (i < tally ? ' visible' : '');
        img.alt = '';
        box.appendChild(img);
      }
    },

    /** Testing view: "trial n of total" and the dragon advancing towards its opponent. */
    setTesting(n, total) {
      $('#target-character').classList.remove('hidden');
      $('.text-container', header).hidden = true;
      $('#stone-container').innerHTML = '';
      $('#trial-display').textContent = fill(strings.header.testTrial, { n, total });
      const step = 100 / total;
      $('#current-character').style.transform = `translateX(${step * (n - 1)}%)`;
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
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const left = Math.max(0, Math.ceil((totalMs - elapsed) / 1000));
        drawCircle(Math.min(1, elapsed / totalMs), left);
      };
      tick();
      trialTimer = setInterval(tick, 250);
    },
    stopTrialTimer() { if (trialTimer) { clearInterval(trialTimer); trialTimer = null; } },
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
        label.textContent = left > 0 ? fill(strings.ui.minutesLeft, { n: Math.floor(left / 60000) }) : strings.ui.finished;
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
