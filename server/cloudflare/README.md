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
npx wrangler secret put STUDY_CODE            # optional; e.g. "draak2026=SMART RCT,pilot27=Pilot" (see Studies)
npx wrangler deploy
```

Restrict `ALLOWED_ORIGINS` in `wrangler.toml` to the site origin
(e.g. `https://jamiecummins.github.io`) after testing.

## Studies

`STUDY_CODE` holds the codes accepted at registration, comma-separated, each
optionally with a label: `draak2026=SMART RCT,pilot27=Pilot wave 2`. The code
a child registers with is stored on the account as its `study` tag, shown in
`admin.html` and in every export (`?study=CODE` filters an export). Give each
study its own link, `https://<site>/?study=CODE`: the registration form then
hides the code field and sends it automatically. Adding a study is just
updating the secret; no redeploy. Leave the secret unset for open, untagged
registration. Databases created before October 2026 need
`migrations/001-study-column.sql` once.

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

Delete all participant data (irreversible; make a backup first):

```bash
npx wrangler d1 execute smart --remote --command "DELETE FROM trials; DELETE FROM sessions; DELETE FROM progress; DELETE FROM users;"
```

## Capacity

A real trial row is about 1.2 KB including indexes. The free plan caps a single
D1 database at 500 MB (about 400 000 trials, roughly 150 children x 13
sessions) and 100 000 row writes per day. For a full study of 150 children x 36
sessions (about 1.1 million trials, 1.3 GB) enable the Workers Paid plan
(USD 5/month: 10 GB per database, 50 million writes/month) before the database
reaches 500 MB. Check the size in the Cloudflare dashboard under D1 -> smart.

## Security notes

- PINs are stored as PBKDF2-SHA256 hashes; 10 failed logins lock an account for 15 minutes.
- Login tokens are HMAC-signed and expire after 24 hours; the app keeps them in `sessionStorage` only.
- Trial uploads are idempotent on `(session_id, seq)`.
