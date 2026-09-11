/**
 * Level state machine: training phase (collect `criterion` consecutive
 * correct answers without a hint) then testing phase (`trials` consecutive
 * trials, all must be correct). Pure logic, no DOM.
 *
 * Events returned by record():
 *   'continue'   - keep going in the current phase
 *   'toTesting'  - training criterion reached; caller shows the battle intro
 *   'passed'     - testing completed without error; level cleared
 *   'failed'     - testing failed; state has been reset to training
 */
export class LevelRunner {
  constructor(options) {
    this.criterion = options.criterion;
    this.testTrials = options.testTrials;
    this.resetOnError = options.resetOnError ?? true;
    this.hintForfeitsPoint = options.hintForfeitsPoint ?? true;
    this.abortOnFirstError = options.abortOnFirstError ?? false;
    this.reset();
  }

  reset() {
    this.phase = 'training';
    this.tally = 0;          // stones in training / correct-in-a-row in testing
    this.testTrial = 0;      // number of testing trials completed
    this.testErrors = 0;
    this.trialsInLevel = 0;
  }

  get testTrialNumber() { return this.testTrial + 1; }

  record({ correct, usedHint = false, timedOut = false }) {
    const ok = Boolean(correct) && !timedOut;
    this.trialsInLevel++;
    if (this.phase === 'training') {
      if (ok && !(usedHint && this.hintForfeitsPoint)) this.tally++;
      else if (!ok && this.resetOnError) this.tally = 0;
      if (this.tally >= this.criterion) {
        this.phase = 'testing';
        this.tally = 0;
        this.testTrial = 0;
        this.testErrors = 0;
        return 'toTesting';
      }
      return 'continue';
    }
    // testing
    this.testTrial++;
    if (ok) this.tally++;
    else { this.tally = 0; this.testErrors++; }
    if (!ok && this.abortOnFirstError) { this.reset(); return 'failed'; }
    if (this.testTrial >= this.testTrials) {
      if (this.testErrors === 0) return 'passed';
      this.reset();
      return 'failed';
    }
    return 'continue';
  }
}
