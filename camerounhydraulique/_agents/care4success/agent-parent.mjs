/**
 * 👨‍👩‍👧 AGENT PARENT — Care4Success
 * Teste :
 *  - Connexion & profil parent
 *  - Dashboard enfants
 *  - Suivi des résultats / devoirs
 *  - Factures & paiements
 *  - Messagerie / communication
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const agent = AGENTS.parent;

function log(emoji, msg, data = '') {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${agent.icon} PARENT ${emoji} ${msg}`, data ? JSON.stringify(data) : '');
}
const pass = (m) => log('✅', m);
const fail = (m, e) => log('❌', m, e);
const info = (m, d) => log('ℹ️ ', m, d);

async function login() {
  info('Connexion parent...', { email: agent.email });
  const res = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: agent.email, password: agent.password }),
  });
  if (res.ok && res.data?.token) {
    pass('Connecté en tant que Parent');
    return { token: res.data.token, userId: res.data.user?.id ?? res.data.userId };
  }
  fail('Échec connexion parent', { status: res.status });
  return null;
}

async function testChildren(token, userId) {
  info('Test : liste de mes enfants (overview)...');
  const res = await fetchJSON(`${BASE_URL}/api/parents/${userId}/overview`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    pass('Dashboard parent / enfants accessible');
  } else fail('Liste enfants inaccessible', { status: res.status });
  return res;
}

async function testChildProgress(token, userId) {
  info('Test : suivi des progrès enfant...');
  const res = await fetchJSON(`${BASE_URL}/api/parents/${userId}/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Suivi des progrès accessible');
  else fail('Suivi inaccessible', { status: res.status });
  return res;
}

async function testInvoices(token, userId) {
  info('Test : factures & paiements...');
  const res = await fetchJSON(`${BASE_URL}/api/parents/${userId}/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    pass('Factures accessibles');
  } else fail('Factures inaccessibles', { status: res.status });
  return res;
}

async function testMessages(token, userId) {
  info('Test : messagerie parent...');
  const res = await fetchJSON(`${BASE_URL}/api/messages/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Messagerie accessible');
  else fail('Messagerie inaccessible', { status: res.status });
  return res;
}

async function testRelationships(token, userId) {
  info('Test : relations parent-enfant...');
  // Correction : le serveur attend parentId ou childId en query param
  const res = await fetchJSON(`${BASE_URL}/api/relationships/parent-child?parentId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Relations parent-enfant accessibles');
  else fail('Relations inaccessibles', { status: res.status });
  return res;
}

async function run() {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${agent.icon}  AGENT PARENT — Care4Success`);
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

  track('Mes Enfants', await testChildren(token, userId));
  track('Suivi des Progrès', await testChildProgress(token, userId));
  track('Factures & Paiements', await testInvoices(token, userId));
  track('Messagerie', await testMessages(token, userId));
  track('Relations Parent-Enfant', await testRelationships(token, userId));

  console.log('\n' + '─'.repeat(60));
  console.log(`  📊 RÉSULTATS AGENT PARENT`);
  console.log('─'.repeat(60));
  results.tests.forEach(t => console.log(`  ${t.ok ? '✅' : '❌'} ${t.label}`));
  console.log('─'.repeat(60));
  console.log(`  TOTAL : ${results.pass} réussis / ${results.fail} échoués`);
  console.log('═'.repeat(60) + '\n');
  return results;
}

run().catch(console.error);
