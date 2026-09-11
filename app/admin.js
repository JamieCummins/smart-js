const $ = (s) => document.querySelector(s);
const status = (msg, ok = false) => { $('#status').textContent = msg; $('#status').style.color = ok ? '#1a8f2a' : '#c62828'; };

try { $('#api').value = localStorage.getItem('smart.admin.api') || ''; } catch { /* ignore */ }

function base() {
  const url = $('#api').value.trim().replace(/\/+$/, '');
  try { localStorage.setItem('smart.admin.api', url); } catch { /* ignore */ }
  return url;
}

async function api(method, path, body) {
  const res = await fetch(base() + path, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${$('#token').value.trim()}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg = `${res.status}`;
    try { msg += ' ' + JSON.stringify(await res.json()); } catch { /* ignore */ }
    throw new Error(msg);
  }
  return res;
}

async function loadUsers() {
  status('Loading…');
  try {
    const users = await (await api('GET', '/admin/users')).json();
    if (!users.length) { $('#users').textContent = 'No participants yet.'; status('', true); return; }
    const cols = ['username', 'language', 'stage', 'sessions_completed', 'trials', 'created_at', 'last_login_at', 'updated_at'];
    $('#users').innerHTML = `<table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${users.map((u) => `<tr>${cols.map((c) => `<td>${u[c] ?? ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    status(`${users.length} participants`, true);
  } catch (e) { status(`Could not load participants: ${e.message}`); }
}

async function download(table) {
  status(`Exporting ${table}…`);
  try {
    const q = new URLSearchParams();
    if ($('#ex-user').value.trim()) q.set('username', $('#ex-user').value.trim());
    if ($('#ex-since').value.trim()) q.set('since', $('#ex-since').value.trim());
    const res = await api('GET', `/admin/export/${table}?${q}`);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `smart-${table}.csv`;
    a.click();
    status(`Downloaded smart-${table}.csv`, true);
  } catch (e) { status(`Export failed: ${e.message}`); }
}

$('#connect').addEventListener('click', loadUsers);
document.querySelectorAll('button[data-table]').forEach((b) => b.addEventListener('click', () => download(b.dataset.table)));

$('#create').addEventListener('click', async () => {
  const users = $('#bulk').value.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const [username, pin, language, stage] = l.split(',').map((s) => s.trim());
    return { username, pin, language: language || undefined, stage: stage ? Number(stage) : undefined };
  });
  try {
    const r = await (await api('POST', '/admin/users', { users })).json();
    $('#create-result').textContent = JSON.stringify(r, null, 2);
    loadUsers();
  } catch (e) { $('#create-result').textContent = `Failed: ${e.message}`; }
});

$('#fix').addEventListener('click', async () => {
  const body = { username: $('#fix-user').value.trim() };
  if ($('#fix-stage').value) body.stage = Number($('#fix-stage').value);
  if ($('#fix-pin').value) body.pin = $('#fix-pin').value.trim();
  try { await api('PATCH', '/admin/users', body); status('Updated', true); loadUsers(); } catch (e) { status(`Update failed: ${e.message}`); }
});
