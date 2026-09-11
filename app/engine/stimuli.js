import { pick } from './random.js';

/**
 * Pool of nonsense syllables, one bucket per stimulus slot (1..4).
 * Mirrors the original behaviour: each trial uses one syllable from each
 * bucket; used syllables are removed so they are not seen again in the
 * session. When a bucket runs dry it is refilled from the original list.
 */
export class StimulusPool {
  constructor(buckets, rng = Math.random) {
    this.original = buckets.map((b) => b.filter(Boolean));
    this.remaining = this.original.map((b) => b.slice());
    this.rng = rng;
    this.current = this.remaining.map((b) => pick(b, rng));
  }

  /** Current syllables, indexed 1..4 via slot(n). */
  slot(n) { return this.current[n - 1]; }

  /** Discard the current syllables and draw fresh ones. */
  next() {
    this.current = this.current.map((used, i) => {
      this.remaining[i] = this.remaining[i].filter((s) => s !== used);
      if (!this.remaining[i].length) this.remaining[i] = this.original[i].slice();
      return pick(this.remaining[i], this.rng);
    });
    return this.current;
  }
}

/** Build buckets from rows of content/syllables.csv (columns bucket_1..bucket_4). */
export function bucketsFromRows(rows, n = 4) {
  const buckets = [];
  for (let i = 1; i <= n; i++) buckets.push(rows.map((r) => r[`bucket_${i}`]).filter(Boolean));
  return buckets;
}
