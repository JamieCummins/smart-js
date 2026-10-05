# SMART data API

The training app talks to its server through this small JSON API. The
reference implementation is `server/cloudflare` (Cloudflare Workers + D1).
Any server that implements the same endpoints can be used instead: set
`backend.type = 'rest'` and `backend.url` in `app/config.js`.

All requests and responses are JSON. Authenticated endpoints expect
`Authorization: Bearer <token>` where the token was returned by
`/auth/register` or `/auth/login`. Errors are `{ "error": "<code>", "message": "..." }`
with an HTTP error status; the app shows a message for these codes:
`invalid`, `taken`, `studyCode`, `username`, `pin`, `unauthorized`, `network`.

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| GET | `/config` | | `{studyCodeRequired, firstStage}` (public) |
| POST | `/auth/register` | `{username, pin, language, studyCode?}` | `201 {token, user}`; the code must be one of the server's `STUDY_CODE` list and is stored as the account's `study` tag |
| POST | `/auth/login` | `{username, pin}` | `{token, user}` |
| GET | `/me` | | `{user}` |
| PUT | `/progress` | `{stage, extra?}` | `{ok}` |
| POST | `/sessions` | `{id, stage, language, startedAt, userAgent, screen, viewport, debug}` | `201 {ok, sessionId}` |
| PATCH | `/sessions/:id` | `{endedAt, stageEnd, levelsPassed, trialsCompleted, endReason}` | `{ok}` (increments `sessionsCompleted`) |
| POST | `/trials` | `{trials: [record, ...]}` (max 200) | `{saved}` |
| POST | `/trials/beacon` | `{token, trials}` | `{saved}` (token in the body; kept for clients that cannot send headers, unused by the app) |

`user` is `{id, username, language, study, stage, sessionsCompleted, createdAt, extra}`.
`stage` is the stage the child starts at in their next session.

Trial uploads must be idempotent: records are unique by `(sessionId, seq)` and a
re-sent batch must not create duplicates (the client retries after network errors).

## Trial record

Each trial record is the object built in `app/main.js` (`record({...})`):

```
sessionId, seq, userId, username,
stage, phase ('training'|'testing'), trialType ('standard'|'math'), trialInLevel, testTrial,
stimuli [4 syllables], row {the CSV row}, question, correctResponse, response, correct (0/1),
rtMs, usedHint (0/1), timedOut (0/1), tallyAfter, levelEvent ('continue'|'toTesting'|'passed'|'failed'),
positions {yes, no}, shownAt, clientTime,
criterion, testTrials
```

The reference server stores the key columns for querying and the whole
record as JSON in `payload`.

## Admin endpoints (Bearer ADMIN_TOKEN)

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/admin/users` | participants with study, stage, sessions and trial counts |
| GET | `/admin/studies` | configured study codes with labels and participant counts |
| POST | `/admin/users` | `{users: [{username, pin, language?, stage?, study?}]}` bulk-create accounts |
| PATCH | `/admin/users` | `{username, stage?, pin?, study?}` reset a PIN, move a child to a stage, or retag |
| DELETE | `/admin/users?username=` | remove a participant and all their data (e.g. load-test accounts) |
| GET | `/admin/export/trials?study=&username=&since=&until=&format=csv|json` | streamed in pages, any size; also `sessions`, `users`, `progress` |

`admin.html` in the repository root is a small page that uses these.
