# SMART API on Cloudflare Workers + D1

Reference implementation of [../API.md](../API.md). Free tier limits (2025):
100k requests/day, 100k D1 row writes/day, 5M row reads/day, 5 GB storage.

## Deploy

```bash
npm install
npx wrangler login
npx wrangler d1 create smart                  # copy database_id into wrangler.toml
npx wrangler d1 execute smart --remote --file=schema.sql
npx wrangler secret put AUTH_SECRET           # long random string, e.g. `openssl rand -hex 32`
npx wrangler secret put ADMIN_TOKEN           # admin.html password
npx wrangler secret put STUDY_CODE            # optional; leave unset to allow open registration
npx wrangler deploy
```

Restrict `ALLOWED_ORIGINS` in `wrangler.toml` to the site origin
(e.g. `https://jamiecummins.github.io`) after testing.

## Local development

```bash
cp .dev.vars.example .dev.vars
npx wrangler d1 execute smart --local --file=schema.sql
npm run dev                                   # http://localhost:8787
```

## Data

Tables: `users`, `progress`, `sessions`, `trials` (see `schema.sql`).
Export via `admin.html` or directly:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" "https://smart-api.<name>.workers.dev/admin/export/trials" > trials.csv
```

or with SQL:

```bash
npx wrangler d1 execute smart --remote --command "SELECT COUNT(*) FROM trials"
```

Back up the database now and then with `npx wrangler d1 export smart --remote --output backup.sql`.

## Security notes

- PINs are stored as PBKDF2-SHA256 hashes; 10 failed logins lock an account for 15 minutes.
- Login tokens are HMAC-signed and expire after 24 hours; the app keeps them in `sessionStorage` only.
- Trial uploads are idempotent on `(session_id, seq)`.
