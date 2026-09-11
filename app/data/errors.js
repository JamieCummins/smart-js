/** Error codes shared by all backends; the login screen maps them to messages. */
export class BackendError extends Error {
  constructor(code, message) {
    super(message || code);
    this.code = code; // 'invalid' | 'taken' | 'studyCode' | 'network' | 'unauthorized' | 'server'
  }
}
