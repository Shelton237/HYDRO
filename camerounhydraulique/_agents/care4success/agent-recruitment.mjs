/**
 * 📝 AGENT RECRUTEMENT — Workflow Candidature & Approbation
 * Teste :
 *  - Dépôt de candidature professeur
 *  - Approbation par l'Admin
 *  - Création automatique du compte utilisateur
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const scenarioId = Date.now().toString().slice(-4);
const candidateEmail = `recrue.${scenarioId}@care4success.cm`;

async function run() {
  console.log('\n' + '💠'.repeat(30));
  console.log(`  🚀 WORKFLOW RECRUTEMENT #${scenarioId}`);
  console.log('💠'.repeat(30) + '\n');

  // 1. Dépôt de candidature
  console.log('1. 📝 Dépôt de candidature par le candidat...');
  const appRes = await fetchJSON(`${BASE_URL}/api/teacher-applications`, {
    method: 'POST',
    body: JSON.stringify({
      fullName: `Nouveau Prof ${scenarioId}`,
      email: candidateEmail,
      phone: '+237 600000000',
      subjects: ['Maths', 'Physique'],
      experienceYears: 5,
      availability: 'Temps plein',
      motivation: 'Passionné par l\'enseignement à domicile.'
    }),
  });
  if (!appRes.ok) throw new Error('Échec dépôt candidature');
  const applicationId = appRes.data.id;
  console.log(`   ✅ Candidature déposée (ID: ${applicationId})`);

  // 2. Connexion Admin pour revue
  console.log('2. 👑 Connexion Admin pour audit...');
  const adminLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: AGENTS.admin.email, password: AGENTS.admin.password }),
  });
  const adminToken = adminLogin.data.token;

  // 3. Approbation de la candidature
  console.log('3. ✅ Approbation de la candidature...');
  const approveRes = await fetchJSON(`${BASE_URL}/api/teacher-applications/${applicationId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({
      status: 'approved',
      reviewNotes: 'Excellent profil, compte créé automatiquement.',
      reviewerName: 'Admin Automatique',
      reviewerRole: 'admin',
      rateType: 'hourly',
      negotiatedRate: 8500
    }),
  });
  if (!approveRes.ok) throw new Error(`Échec approbation: ${JSON.stringify(approveRes.data)}`);
  console.log('   ✅ Candidature approuvée avec succès');

  // 4. Vérification de la création du compte (Tentative de login avec mot de passe par défaut)
  // Le serveur génère un mot de passe (on va tester si le compte existe en base ou si on peut se login)
  console.log('4. 🔐 Vérification du nouveau compte...');
  // Note: On ne connaît pas le mot de passe généré aléatoirement (ex: Prof#1234)
  // Mais on peut vérifier via l'API Admin si l'utilisateur existe
  const userCheck = await fetchJSON(`${BASE_URL}/api/users`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const newUser = userCheck.data.find(u => u.email === candidateEmail);
  if (newUser) {
    console.log(`   ✅ Compte créé avec rôle : ${newUser.role}`);
  } else {
    throw new Error('Le compte utilisateur n\'a pas été créé.');
  }

  console.log('\n' + '💠'.repeat(30));
  console.log(`  🏁 WORKFLOW RECRUTEMENT TERMINÉ`);
  console.log('💠'.repeat(30) + '\n');
}

run().catch(err => {
  console.error('❌ WORKFLOW INTERROMPU:', err.message);
  process.exit(1);
});
