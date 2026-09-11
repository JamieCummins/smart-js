# SMART training (web build)

A dependency-free web version of the **SMART** programme (Strengthening Mental
Abilities with Relational Training), gamified child version. It runs as a
static site (for example on GitHub Pages), stores accounts, progress and trial
data through a small pluggable API, and keeps all trial content in CSV files.

This replaces the earlier lab.js builder export (kept in `legacy/`).

## Layout

```
index.html            the training app
admin.html            researcher page: participants, CSV export, bulk accounts
app/
  config.js           training parameters (criteria, timers, backend, debug overrides)
  main.js             session flow: login -> intro -> levels -> ending
  engine/             pure logic, unit-tested (csv, stimuli, trials, level state machine, content)
  ui/                 screens, header (dragon, stones, timers), audio
  data/               backends: local (browser only), rest (server), upload queue
  i18n/nl.js, en.js   all text, per language
  style.css
content/
  trials/nl/, en/     one CSV per stage (stage_5.csv ... stage_122.csv)
  stages.csv          stage -> family, background, optional per-stage criteria
  dragons.csv         stage -> dragon name, image, fact (nl/en)
  syllables.csv       the four buckets of nonsense syllables
static/               images and sounds
server/
  API.md              the JSON API the app talks to
  cloudflare/         reference server: Cloudflare Worker + D1 (free tier)
tools/                content import/translation scripts
tests/                node --test
legacy/               the old lab.js material and the last lab.js export
```

## Running locally

No build step. Any static file server works:

```bash
npm run serve        # python3 -m http.server 8080  ->  http://localhost:8080
```

Useful URLs while developing (see `app/config.js` for the full list):

| URL | What it does |
| --- | --- |
| `?lang=en` | English interface and English trial files |
| `?debug` | short levels (2 stones, 2 test trials), 5-minute session, debug bar with *auto-answer* and CSV download |
| `?debug&stage=104` | preview a specific level |
| `?debug&sessionSec=90` | shorter session |
| `?backend=local` | ignore the configured server and keep everything in this browser |
| `?api=https://...` | point at a different API server |

Tests:

```bash
npm test
```

## Deploying the app (GitHub Pages)

1. Push this repository to GitHub.
2. Repository *Settings -> Pages -> Build and deployment*: Source **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The app is served at `https://<user>.github.io/<repo>/`. `admin.html` sits next to it.

Everything is relative paths, so it also works from any sub-folder or any other static host.

## Data storage

`app/config.js -> backend` chooses where accounts, progress and trials go:

| type | Where data lives | Use for |
| --- | --- | --- |
| `local` | this browser's localStorage | demos, piloting, offline testing |
| `rest` | a server implementing [server/API.md](server/API.md) | real data collection |

The app uploads trials in small batches while the child plays, queues them in
the browser when the network drops, retries, and flushes immediately when the
tab is hidden or closed. A row is only removed from the browser queue once the
server has confirmed it, so anything left when a tab closes is uploaded the
next time that child plays in the same browser. Records are idempotent
(`sessionId + seq`), so retries never create duplicates.

`node tools/check-export.js smart-trials.csv [smart-sessions.csv]` checks an
export for missing or duplicated rows per session.

### Recommended server: Cloudflare Workers + D1 (free)

`server/cloudflare` is a complete implementation. Cloudflare's free plan
allows 100 000 requests and 100 000 database writes per day and 5 GB of
storage, which comfortably covers several hundred participants doing
30 sessions each (a 30-minute session is roughly 150 to 250 trial rows and
about 50 requests). There is no monthly fee; the paid plan, should you ever
exceed the free limits, is USD 5 per month.

Setup (about 15 minutes, needs a free Cloudflare account and Node.js):

```bash
cd server/cloudflare
npm install
npx wrangler login                        # opens the browser once
npx wrangler d1 create smart              # prints a database_id
#   -> paste the database_id into wrangler.toml
npx wrangler d1 execute smart --remote --file=schema.sql
npx wrangler secret put AUTH_SECRET       # any long random string
npx wrangler secret put ADMIN_TOKEN       # password for admin.html
npx wrangler secret put STUDY_CODE        # optional: code children need to register
npx wrangler deploy                       # prints https://smart-api.<name>.workers.dev
```

Then in `app/config.js`:

```js
backend: { type: 'rest', url: 'https://smart-api.<name>.workers.dev', studyCode: '' },
```

Set `ALLOWED_ORIGINS` in `wrangler.toml` to your GitHub Pages origin once it
works. Open `admin.html`, enter the API URL and the admin token, and you can
list participants, create accounts in bulk (`username,pin` per line), reset a
PIN, move a child to another stage, and download `trials.csv`,
`sessions.csv`, `progress.csv` and `users.csv`.

The trials export has one row per trial with the key fields as columns and the
complete record (including the CSV row that generated the trial) as JSON in
`payload`.

Local development of the server:

```bash
cd server/cloudflare
cp .dev.vars.example .dev.vars
npx wrangler d1 execute smart --local --file=schema.sql
npm run dev                                # http://localhost:8787
# then open the app with ?api=http://localhost:8787
```

### Other options

Any server that implements `server/API.md` works with the `rest` backend:
a PHP script on existing hosting, a Supabase edge function, a small Node
service. Firebase/Firestore would need a new adapter in `app/data/` with the
same six methods as `rest.js`; the rest of the app does not care.

## Accounts and progress

Children log in with a **username and PIN** (4 to 8 digits). A new child
picks the *first time* tab and creates the account (optionally with a study
code); the researcher can also pre-create accounts from `admin.html`.
Progress (the stage to start at next time) is stored on the server after every
level won. On shared computers the login is forgotten when the tab is closed
and at the end of each session, so the next child sees the login screen.

A refresh during a session restarts the current level's training phase, as in
the original programme.

## Configuration

All tunable parameters are in `app/config.js` with comments, for example:

```js
training: { criterion: 16, resetOnError: true, hintForfeitsStone: true, hintEnabled: true },
testing:  { trials: 16, abortOnFirstError: false },
trial:    { timeoutMs: 30000, randomizeResponsePositions: true },
session:  { durationSec: 1859, endMidTrial: false },
```

`abortOnFirstError: true` ends a test at the first mistake instead of letting
the child finish all test trials. Per-stage overrides go in `content/stages.csv`
(`training_criterion`, `testing_trials`, `abort_on_first_error`); leave a cell
empty to use the global value.

## Editing content

### Trials

One CSV per stage and language: `content/trials/<lang>/stage_<n>.csv`. The
columns are the ones the original programme used, so existing generators keep
working:

- standard trials: `relation_1..4`, `stim_1_id..stim_8_id` (1-4, referring to the
  four syllables drawn for the trial), `q_stim_1_id`, `q_rel`, `q_stim_2_id`,
  `q_word`, `correct_response` (`yes`/`no`), `NAARR_1..4` (hint image for
  syllable 1-4, path relative to the site root, empty for no image).
- mathematical trials: `relation_1`, `meta_relation_1`, `relation_2`,
  `meta_stim_1_id`, `meta_relation_2`, `meta_stim_2_id`, `q_*`, `correct_response`.
- optional `hint_text` (HTML allowed) shown in the hint box for any trial;
  this is how hints for the mathematical stages can be added.

A trial is treated as mathematical when it has a non-empty `meta_relation_1`.
The hint button appears in training whenever a trial has any hint image or
hint text. Rows are drawn shuffled, reshuffled when exhausted.

The Dutch set is canonical. `npm run content:translate` regenerates the
English set from it using the dictionary in `tools/translate-trials.js`; add a
dictionary and an `app/i18n/<code>.js` to add a language.

### Dragons, stages, syllables

- `content/dragons.csv`: `stage,name,image,fact_nl,fact_en`. Stages 104-122
  currently use `static/placeholder-dragon.svg`; drop in images and edit the rows.
- `content/stages.csv`: family (used to group the collection screens),
  background image, optional criteria overrides. Add rows to add stages.
- `content/syllables.csv`: four columns, one bucket per stimulus slot.

`npm test` checks that every stage has a dragon and a background and that every
trial file in every language resolves without empty stimuli.

### Text

All on-screen text lives in `app/i18n/nl.js` and `app/i18n/en.js` (intro
screens, feedback, battle screens, motivational messages, login form,
relation colour classes).

## Content notes (differences from the lab.js build)

- The lab.js build advanced the stage counter twice after a won level (once
  in `next_stage`, once in `skip_chunk_reset`); here a won level advances one stage.
- The battle animation played after test trial 15 and again after 16; now once.
- Stage 55/56 dragons: the fact text and the image name disagreed; now
  Runebrorn is stage 55 and Shadowmire stage 56. `Forstrex` -> `Frostrex`,
  `Amthyst` -> `Amethyst`, `Somnyx` -> `Somnix` in the facts.
- The session ends after the trial in progress (and its feedback) instead of
  cutting the screen mid-trial (`session.endMidTrial`).
- Stimulus buckets refill when exhausted instead of running dry.
- The ending screen no longer shows a password; progress is on the server.

## Legacy

`legacy/` contains the previous repository contents (lab.js JSON files,
R scripts for stimuli, passwords and trial translation) and
`legacy/labjs-gamified-export/`, the last lab.js export this build was
derived from, including the original full-size images and the Dutch trial CSVs
that were previously fetched from drjamiecummins.com.
`tools/build-content-from-labjs.js` regenerates `content/` from that export.
