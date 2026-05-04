/**
 * 💼 AGENT CONSEILLER (ADVISOR) — Care4Success
 * Teste :
 *  - Connexion & profil conseiller
 *  - Liste des élèves à suivre
 *  - Rapports de performance
 *  - Recommandations
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const agent = AGENTS.advisor;

function log(emoji, msg, data = '') {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${agent.icon} ADVISOR ${emoji} ${msg}`, data ? JSON.stringify(data) : '');
}
const pass = (m) => log('✅', m);
const fail = (m, e) => log('❌', m, e);
const info = (m, d) => log('ℹ️ ', m, d);

async function login() {
  info('Connexion conseiller...', { email: agent.email });
  const res = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: agent.email, password: agent.password }),
  });
  if (res.ok && res.data?.token) {
    pass('Connecté en tant que Conseiller');
    return { token: res.data.token, userId: res.data.user?.id ?? res.data.userId };
  }
  fail('Échec connexion conseiller', { status: res.status });
  return null;
}

async function testDashboard(token, userId) {
  info('Test : dashboard conseiller...');
  const res = await fetchJSON(`${BASE_URL}/api/advisors/${userId}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Dashboard conseiller accessible');
  else fail('Dashboard inaccessible', { status: res.status });
  return res;
}

async function testFamilies(token) {
  info('Test : familles à suivre (advisor/families)...');
  const res = await fetchJSON(`${BASE_URL}/api/advisor/families`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    pass('Liste des familles accessible');
  } else fail('Liste familles inaccessible', { status: res.status });
  return res;
}

async function testAppointments(token, userId) {
  info('Test : rendez-vous / appointments...');
  const res = await fetchJSON(`${BASE_URL}/api/advisors/${userId}/appointments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Rendez-vous accessibles');
  else fail('Rendez-vous inaccessibles', { status: res.status });
  return res;
}

async function testMessages(token, userId) {
  info('Test : messagerie conseiller...');
  const res = await fetchJSON(`${BASE_URL}/api/messages/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Messagerie accessible');
  else fail('Messagerie inaccessible', { status: res.status });
  return res;
}

async function run() {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${agent.icon}  AGENT CONSEILLER — Care4Success (Brice Owona)`);
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

  track('Dashboard Conseiller', await testDashboard(token, userId));
  track('Familles à Accompagner', await testFamilies(token));
  track('Rendez-vous / Emploi du temps', await testAppointments(token, userId));
  track('Messagerie conseiller', await testMessages(token, userId));

  console.log('\n' + '─'.repeat(60));
  console.log(`  📊 RÉSULTATS AGENT CONSEILLER`);
  console.log('─'.repeat(60));
  results.tests.forEach(t => console.log(`  ${t.ok ? '✅' : '❌'} ${t.label}`));
  console.log('─'.repeat(60));
  console.log(`  TOTAL : ${results.pass} réussis / ${results.fail} échoués`);
  console.log('═'.repeat(60) + '\n');
  return results;
}

run().catch(console.error);
