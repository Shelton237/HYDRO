/**
 * 👑 AGENT ADMIN — Care4Success
 * Teste toutes les fonctionnalités d'administration :
 *  - Tableau de bord global
 *  - Gestion des candidatures professeurs
 *  - Finance & Paie
 *  - Gestion des utilisateurs
 */

import { BASE_URL, AGENTS, TIMEOUTS, fetchJSON } from './config.mjs';

const agent = AGENTS.admin;

function log(emoji, msg, data = '') {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${agent.icon} ADMIN ${emoji} ${msg}`, data ? JSON.stringify(data) : '');
}

function pass(msg) { log('✅', msg); }
function fail(msg, err) { log('❌', msg, err); }
function info(msg, data) { log('ℹ️ ', msg, data); }

// ─────────────────────────────────────────────────────────────
// Étape 1 — Authentification
// ─────────────────────────────────────────────────────────────
async function login() {
  info('Tentative de connexion...', { email: agent.email });
  const res = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: agent.email, password: agent.password }),
  });

  if (res.ok && res.data?.token) {
    pass(`Connecté en tant qu'Admin (token reçu)`);
    return res.data.token;
  }
  fail('Échec de connexion', res);
  return null;
}

// ─────────────────────────────────────────────────────────────
// Étape 2 — Dashboard
// ─────────────────────────────────────────────────────────────
async function testDashboard(token) {
  info('Test du dashboard admin...');
  const res = await fetchJSON(`${BASE_URL}/api/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Dashboard admin accessible');
  else fail('Dashboard admin inaccessible', { status: res.status });
  return res;
}

// ─────────────────────────────────────────────────────────────
// Étape 3 — Candidatures professeurs
// ─────────────────────────────────────────────────────────────
async function testApplications(token) {
  info('Test : liste des candidatures professeurs...');
  // Route réelle découverte : /api/teacher-applications
  const res = await fetchJSON(`${BASE_URL}/api/teacher-applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const count = Array.isArray(res.data) ? res.data.length : (res.data?.data?.length ?? '?');
    pass(`Candidatures récupérées (${count} entrées)`);
  } else {
    fail('Candidatures inaccessibles', { status: res.status });
  }
  return res;
}

// ─────────────────────────────────────────────────────────────
// Étape 4 — Finance & Paie
// ─────────────────────────────────────────────────────────────
async function testFinance(token) {
  info('Test : données financières (platform-settings + teachers earnings)...');
  const res = await fetchJSON(`${BASE_URL}/api/platform-settings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) pass('Module finance / paramètres plateforme accessible');
  else fail('Module finance inaccessible', { status: res.status });
  return res;
}

// ─────────────────────────────────────────────────────────────
// Étape 5 — Gestion utilisateurs
// ─────────────────────────────────────────────────────────────
async function testUsers(token) {
  info('Test : liste des utilisateurs...');
  // Route réelle : /api/users (nécessite auth admin)
  const res = await fetchJSON(`${BASE_URL}/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const count = Array.isArray(res.data) ? res.data.length : (res.data?.data?.length ?? '?');
    pass(`Utilisateurs récupérés (${count} entrées)`);
  } else {
    fail('Liste utilisateurs inaccessible', { status: res.status });
  }
  return res;
}

async function testTeacherApplicationsReview(token) {
  info('Test : révision d\'une candidature (workflow admin)...');
  // Récupère les candidatures en attente et tente de les lire
  const res = await fetchJSON(`${BASE_URL}/api/teacher-applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const pending = Array.isArray(res.data)
      ? res.data.filter(a => a.status === 'pending')
      : [];
    pass(`Workflow candidatures OK — ${pending.length} en attente`);
  } else {
    fail('Workflow candidatures inaccessible', { status: res.status });
  }
  return res;
}

// ─────────────────────────────────────────────────────────────
// RUNNER PRINCIPAL
// ─────────────────────────────────────────────────────────────
async function run() {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${agent.icon}  AGENT ADMIN — Care4Success`);
  console.log(`  URL : ${BASE_URL}`);
  console.log('═'.repeat(60) + '\n');

  const results = { pass: 0, fail: 0, tests: [] };

  const track = (label, fn) => async (...args) => {
    const r = await fn(...args);
    const ok = r?.ok ?? false;
    results.tests.push({ label, ok });
    if (ok) results.pass++; else results.fail++;
    return r;
  };

  const token = await login();
  if (!token) {
    fail('ARRÊT : impossible de se connecter');
    process.exit(1);
  }

  await track('Dashboard Admin', testDashboard)(token);
  await track('Candidatures Profs', testApplications)(token);
  await track('Finance & Paramètres', testFinance)(token);
  await track('Gestion Utilisateurs', testUsers)(token);
  await track('Workflow Révision Candidatures', testTeacherApplicationsReview)(token);

  // ── Résumé ──────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log(`  📊 RÉSULTATS AGENT ADMIN`);
  console.log('─'.repeat(60));
  results.tests.forEach(t => console.log(`  ${t.ok ? '✅' : '❌'} ${t.label}`));
  console.log('─'.repeat(60));
  console.log(`  TOTAL : ${results.pass} réussis / ${results.fail} échoués`);
  console.log('═'.repeat(60) + '\n');

  return results;
}

run().catch(console.error);
