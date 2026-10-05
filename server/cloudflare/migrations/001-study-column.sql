-- Adds the study tag to existing databases created before October 2026.
-- Apply once:  npx wrangler d1 execute smart --remote --file=migrations/001-study-column.sql
ALTER TABLE users ADD COLUMN study TEXT;
CREATE INDEX IF NOT EXISTS users_study ON users(study);
