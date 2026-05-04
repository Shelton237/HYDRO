/**
 * 🧑‍🏫 AGENT TUTEUR — Care4Success
 * Teste :
 *  - Connexion & profil tuteur
 *  - Mes tutorés (élèves assignés)
 *  - Suivi individuel
 *  - Séances & planification
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const agent = AGENTS.tutor;

function log(emoji, msg, data = '') {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${agent.icon} TUTOR ${emoji} ${msg}`, data ? JSON.stringify(data) : '');
}
const pass = (m) => log('✅', m);
const fail = (m, e) => log('❌', m, e);
const info = (m, d) => log('ℹ️ ', m, d);

async function login() {
  info('Connexion tuteur...', { email: agent.email });
  const res = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: agent.email, password: agent.password }),
  });
  if (res.ok && res.data?.token) {
    pass('Connecté en tant que Tuteur');
    return { token: res.data.token, userId: res.data.user?.id ?? res.data.userId };
  }
  fail('Échec connexion tuteur', { status: res.status });
  return null;
}

async function testProfile(token, userId) {
  info('Test : profil tuteur (users/:id)...');
  const res = await fetchJSON(`${BASE_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Profil tuteur accessible');
  else fail('Profil inaccessible', { status: res.status });
  return res;
}

async function testTutorees(token, userId) {
  info('Test : mes tutorés (via teacher students API)...');
  // On teste si l'endpoint teacher fonctionne pour le rôle tutor
  const res = await fetchJSON(`${BASE_URL}/api/teachers/${userId}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    pass('Tutorés récupérés');
  } else fail('Liste tutorés inaccessible', { status: res.status });
  return res;
}

async function testHomework(token, userId) {
  info('Test : devoirs assignés (homework/tutor/:id)...');
  const res = await fetchJSON(`${BASE_URL}/api/homework/tutor/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Devoirs accessibles');
  else fail('Devoirs inaccessibles', { status: res.status });
  return res;
}

async function testResources(token, userId) {
  info('Test : ressources pédagogiques (lesson-resources/tutor/:id)...');
  const res = await fetchJSON(`${BASE_URL}/api/lesson-resources/tutor/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Ressources accessibles');
  else fail('Ressources inaccessibles', { status: res.status });
  return res;
}

async function run() {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${agent.icon}  AGENT TUTEUR — Care4Success (Marie Tuteur)`);
  console.log(`  URL : ${BASE_URL}`);
  console.log('═'.repeat(60) + '\n');

  const results = { pass: 0, fail: 0, tests: [] };
  const track = (label, res) => {
    const ok = res?.ok ?? false;
    results.tests.push({ label, ok });
    if (ok) results.pass++; else results.fail++;
  };

  const tokenData = await login();
  if (!tokenData) { fail('ARRÊT : impossible de se connecter'); process.exit(1); }
  const { token, userId } = tokenData;

  track('Profil Tuteur', await testProfile(token, userId));
  track('Mes Tutorés', await testTutorees(token, userId));
  track('Devoirs Assignés', await testHomework(token, userId));
  track('Ressources Pédagogiques', await testResources(token, userId));

  console.log('\n' + '─'.repeat(60));
  console.log(`  📊 RÉSULTATS AGENT TUTEUR`);
  console.log('─'.repeat(60));
  results.tests.forEach(t => console.log(`  ${t.ok ? '✅' : '❌'} ${t.label}`));
  console.log('─'.repeat(60));
  console.log(`  TOTAL : ${results.pass} réussis / ${results.fail} échoués`);
  console.log('═'.repeat(60) + '\n');
  return results;
}

run().catch(console.error);
