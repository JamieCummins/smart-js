/** Sound effects; playback failures (autoplay policy) are ignored. */
const files = {
  correct: 'static/correct.mp3',
  incorrect: 'static/incorrect.mp3',
  battle: 'static/battle.mp3',
  fail: 'static/fail.mp3',
  fanfare: 'static/fanfare.mp3',
  catch: 'static/goodresult.mp3',
  pop: 'static/pop.mp3',
};
const cache = {};

export function preloadAudio() {
  for (const [k, src] of Object.entries(files)) {
    const a = new Audio(src);
    a.preload = 'auto';
    cache[k] = a;
  }
}

export function play(name) {
  const a = cache[name] || new Audio(files[name]);
  try {
    a.currentTime = 0;
    const p = a.play();
    if (p?.catch) p.catch(() => {});
  } catch { /* ignore */ }
}
