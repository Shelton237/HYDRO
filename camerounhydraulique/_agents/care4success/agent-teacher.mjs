/**
 * 🎓 AGENT PROFESSEUR — Care4Success
 * Teste les fonctionnalités enseignant :
 *  - Connexion & profil
 *  - Mes cours / sessions
 *  - Devoirs & évaluations
 *  - Mes gains (finance prof)
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const agent = AGENTS.teacher;

function log(emoji, msg, data = '') {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${agent.icon} TEACHER ${emoji} ${msg}`, data ? JSON.stringify(data) : '');
}
const pass = (m) => log('✅', m);
const fail = (m, e) => log('❌', m, e);
const info = (m, d) => log('ℹ️ ', m, d);

async function login() {
  info('Connexion prof...', { email: agent.email });
  const res = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: agent.email, password: agent.password }),
  });
  if (res.ok && res.data?.token) {
    pass('Connecté en tant que Professeur');
    return { token: res.data.token, userId: res.data.user?.id ?? res.data.userId };
  }
  fail('Échec connexion prof', { status: res.status });
  return null;
}

async function testProfile(token, userId) {
  info('Test : profil enseignant...');
  const res = await fetchJSON(`${BASE_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Profil enseignant accessible');
  else fail('Profil inaccessible', { status: res.status });
  return res;
}

async function testDashboard(token, userId) {
  info('Test : dashboard enseignant...');
  const res = await fetchJSON(`${BASE_URL}/api/teachers/${userId}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Dashboard enseignant accessible');
  else fail('Dashboard inaccessible', { status: res.status });
  return res;
}

async function testSessions(token, userId) {
  info('Test : sessions / cours...');
  // Correction de la route : le serveur attend des query params role et userId
  const res = await fetchJSON(`${BASE_URL}/api/sessions?role=teacher&userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const count = Array.isArray(res.data) ? res.data.length : '?';
    pass(`Sessions récupérées (${count})`);
  } else fail('Sessions inaccessibles', { status: res.status });
  return res;
}

async function testAssignments(token) {
  info('Test : devoirs / évaluations...');
  const res = await fetchJSON(`${BASE_URL}/api/assignments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Devoirs accessibles');
  else fail('Devoirs inaccessibles', { status: res.status });
  return res;
}

async function testEarnings(token, userId) {
  info('Test : mes gains (finance)...');
  const res = await fetchJSON(`${BASE_URL}/api/teachers/${userId}/earnings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Module gains accessible');
  else fail('Module gains inaccessible', { status: res.status });
  return res;
}

async function testStudents(token, userId) {
  info('Test : mes élèves...');
  const res = await fetchJSON(`${BASE_URL}/api/teachers/${userId}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const count = Array.isArray(res.data) ? res.data.length : '?';
    pass(`Élèves récupérés (${count})`);
  } else fail('Liste élèves inaccessible', { status: res.status });
  return res;
}

async function run() {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${agent.icon}  AGENT PROFESSEUR — Care4Success`);
  console.log(`  URL : ${BASE_URL}`);
  console.log('═'.repeat(60) + '\n');

  const results = { pass: 0, fail: 0, tests: [] };
  const track = (label, res) => {
    const ok = res?.ok ?? false;
    results.tests.push({ label, ok });
    if (ok) results.pass++; else results.fail++;
  };

  const token = await login();
  if (!token) { fail('ARRÊT : impossible de se connecter'); process.exit(1); }
  const { token: tok, userId } = token;
  info(`UserID : ${userId}`);

  track('Profil Enseignant', await testProfile(tok, userId));
  track('Dashboard Enseignant', await testDashboard(tok, userId));
  track('Sessions & Cours', await testSessions(tok, userId));
  track('Devoirs & Évaluations', await testAssignments(tok));
  track('Mes Gains (Finance)', await testEarnings(tok, userId));
  track('Mes Élèves', await testStudents(tok, userId));

  console.log('\n' + '─'.repeat(60));
  console.log(`  📊 RÉSULTATS AGENT PROFESSEUR`);
  console.log('─'.repeat(60));
  results.tests.forEach(t => console.log(`  ${t.ok ? '✅' : '❌'} ${t.label}`));
  console.log('─'.repeat(60));
  console.log(`  TOTAL : ${results.pass} réussis / ${results.fail} échoués`);
  console.log('═'.repeat(60) + '\n');
  return results;
}

run().catch(console.error);
