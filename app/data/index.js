import { createLocalBackend } from './local.js';
import { createRestBackend } from './rest.js';

export function createBackend(config, { firstStage }) {
  const b = config.backend;
  if (b.type === 'rest' && b.url) return createRestBackend({ url: b.url, studyCode: b.studyCode });
  if (b.type === 'rest') console.warn('backend.type is "rest" but backend.url is empty; falling back to local storage');
  return createLocalBackend({ firstStage });
}

export const USERNAME_RE = /^[a-z0-9_-]{2,32}$/;
export const PIN_RE = /^\d{4,8}$/;
export const normalizeUsername = (s) => String(s || '').trim().toLowerCase();
