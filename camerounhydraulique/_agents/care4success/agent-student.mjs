/**
 * 📚 AGENT ÉLÈVE (STUDENT) — Care4Success
 * Teste les fonctionnalités étudiant :
 *  - Connexion & profil (XP, grade)
 *  - Dashboard & gamification
 *  - Mes cours
 *  - Mes devoirs
 *  - Mes évaluations / notes
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const agent = AGENTS.student;

function log(emoji, msg, data = '') {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${agent.icon} STUDENT ${emoji} ${msg}`, data ? JSON.stringify(data) : '');
}
const pass = (m) => log('✅', m);
const fail = (m, e) => log('❌', m, e);
const info = (m, d) => log('ℹ️ ', m, d);

async function login() {
  info('Connexion élève...', { email: agent.email });
  const res = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: agent.email, password: agent.password }),
  });
  if (res.ok && res.data?.token) { pass('Connecté en tant qu\'Élève'); return res.data.token; }
  fail('Échec connexion élève', res);
  return null;
}

async function testDashboard(token, userId) {
  info('Test : dashboard élève (XP, grade, gamification)...');
  const res = await fetchJSON(`${BASE_URL}/api/students/${userId}/overview`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const xp = res.data?.xp ?? res.data?.data?.xp ?? '?';
    const grade = res.data?.grade ?? res.data?.data?.grade ?? '?';
    pass(`Dashboard accessible — XP: ${xp}, Grade: ${grade}`);
  } else fail('Dashboard inaccessible', { status: res.status });
  return res;
}

async function testCourses(token, userId) {
  info('Test : mes cours...');
  const res = await fetchJSON(`${BASE_URL}/api/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const count = Array.isArray(res.data) ? res.data.length : '?';
    pass(`Cours récupérés (${count})`);
  } else fail('Cours inaccessibles', { status: res.status });
  return res;
}

async function testAssignments(token, userId) {
  info('Test : mes devoirs en attente...');
  // Route réelle : /api/homework/:role/:userId
  const res = await fetchJSON(`${BASE_URL}/api/homework/student/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Devoirs accessibles');
  else fail('Devoirs inaccessibles', { status: res.status });
  return res;
}

async function testGrades(token, userId) {
  info('Test : mes notes / évaluations...');
  const res = await fetchJSON(`${BASE_URL}/api/students/${userId}/grades`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Notes accessibles');
  else fail('Notes inaccessibles', { status: res.status });
  return res;
}

async function testProgress(token, userId) {
  info('Test : progression élève...');
  const res = await fetchJSON(`${BASE_URL}/api/students/${userId}/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Progression accessible');
  else fail('Progression inaccessible', { status: res.status });
  return res;
}

async function run() {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${agent.icon}  AGENT ÉLÈVE — Care4Success (Koffi Diallo)`);
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
  info(`UserID récupéré : ${userId}`);

  track('Dashboard & Gamification', await testDashboard(tok, userId));
  track('Mes Cours', await testCourses(tok, userId));
  track('Mes Devoirs', await testAssignments(tok, userId));
  track('Mes Notes', await testGrades(tok, userId));
  track('Ma Progression', await testProgress(tok, userId));

  console.log('\n' + '─'.repeat(60));
  console.log(`  📊 RÉSULTATS AGENT ÉLÈVE`);
  console.log('─'.repeat(60));
  results.tests.forEach(t => console.log(`  ${t.ok ? '✅' : '❌'} ${t.label}`));
  console.log('─'.repeat(60));
  console.log(`  TOTAL : ${results.pass} réussis / ${results.fail} échoués`);
  console.log('═'.repeat(60) + '\n');
  return results;
}

run().catch(console.error);
