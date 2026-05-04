/**
 * 💰 AGENT FACTURATION — Audit Financier & Facturation
 * Teste :
 *  - Génération automatique des factures par l'Admin
 *  - Consultation des factures côté Parent
 *  - Audit des totaux financiers (Admin)
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const scenarioId = Date.now().toString().slice(-4);

async function run() {
  console.log('\n' + '💸'.repeat(30));
  console.log(`  🚀 AUDIT FINANCIER #${scenarioId}`);
  console.log('💸'.repeat(30) + '\n');

  // 1. Connexion Admin
  console.log('1. 👑 Connexion Admin...');
  const adminLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: AGENTS.admin.email, password: AGENTS.admin.password }),
  });
  const adminToken = adminLogin.data.token;

  // 2. Lancement de la facturation automatique
  console.log('2. 📊 Génération de la facturation mensuelle...');
  const billingRes = await fetchJSON(`${BASE_URL}/api/admin/finance/generate-invoices`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({ month: new Date().toISOString().slice(0, 7) })
  });
  if (billingRes.ok) {
    console.log(`   ✅ Facturation terminée : ${billingRes.data.generated} facture(s) générée(s) pour ${billingRes.data.month}`);
  } else {
    console.warn(`   ⚠️ Facturation impossible ou déjà effectuée : ${billingRes.data.message}`);
  }

  // 3. Consultation côté Parent
  console.log('3. 👨‍👩‍👧 Vérification côté Parent...');
  const parentLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: AGENTS.parent.email, password: AGENTS.parent.password }),
  });
  const parentToken = parentLogin.data.token;
  const parentId = parentLogin.data.user?.id || parentLogin.data.userId;

  const invoicesRes = await fetchJSON(`${BASE_URL}/api/parents/${parentId}/invoices`, {
    headers: { Authorization: `Bearer ${parentToken}` }
  });
  if (invoicesRes.ok) {
    console.log(`   ✅ Factures récupérées (${invoicesRes.data.length} entrées)`);
    if (invoicesRes.data.length > 0) {
      const top = invoicesRes.data[0];
      console.log(`   📄 Dernière facture : ${top.amount} FCFA - Statut: ${top.status}`);
    }
  } else {
    throw new Error('Impossible de consulter les factures parent.');
  }

  // 4. Audit des totaux financiers (Admin)
  console.log('4. 🏛️ Audit des finances globales...');
  const statsRes = await fetchJSON(`${BASE_URL}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  if (statsRes.ok) {
    const stats = statsRes.data;
    console.log(`   📈 Total Facturé : ${stats.totalBilled || 0} FCFA`);
    console.log(`   💰 Total Encaissé : ${stats.totalPaid || 0} FCFA`);
    console.log(`   💹 Taux de recouvrement : ${stats.totalBilled ? Math.round((stats.totalPaid/stats.totalBilled)*100) : 0}%`);
  }

  console.log('\n' + '💸'.repeat(30));
  console.log(`  🏁 AUDIT FINANCIER TERMINÉ`);
  console.log('💸'.repeat(30) + '\n');
}

run().catch(err => {
  console.error('❌ AUDIT INTERROMPU:', err.message);
  process.exit(1);
});
