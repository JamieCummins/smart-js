-- SMART training database schema (Cloudflare D1 / SQLite)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  pin_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  language TEXT,
  study TEXT,            -- study code used at registration (see STUDY_CODE)
  created_at TEXT NOT NULL,
  last_login_at TEXT,
  failed_logins INTEGER DEFAULT 0,
  locked_until TEXT
);

CREATE INDEX IF NOT EXISTS users_study ON users(study);

CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER PRIMARY KEY REFERENCES users(id),
  stage INTEGER NOT NULL,
  sessions_completed INTEGER DEFAULT 0,
  extra TEXT,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  started_at TEXT,
  ended_at TEXT,
  stage_start INTEGER,
  stage_end INTEGER,
  levels_passed INTEGER,
  trials_completed INTEGER,
  end_reason TEXT,
  language TEXT,
  user_agent TEXT,
  screen TEXT,
  viewport TEXT,
  debug INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id, started_at);

CREATE TABLE IF NOT EXISTS trials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  session_id TEXT NOT NULL,
  seq INTEGER NOT NULL,
  stage INTEGER,
  phase TEXT,
  trial_type TEXT,
  correct INTEGER,
  response TEXT,
  correct_response TEXT,
  rt_ms REAL,
  used_hint INTEGER,
  timed_out INTEGER,
  tally_after INTEGER,
  question TEXT,
  stimuli TEXT,
  payload TEXT,          -- full JSON record including the CSV row that generated the trial
  client_time TEXT,
  created_at TEXT,
  UNIQUE(session_id, seq)
);
CREATE INDEX IF NOT EXISTS trials_user ON trials(user_id, created_at);
