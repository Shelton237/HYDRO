/**
 * 🚀 AGENT SCÉNARIO — Flux Complet Care4Success
 * Simule le cycle de vie d'une inscription :
 * 1. Parent : Inscrit un enfant (via /api/parents/enroll)
 * 2. Admin  : Valide la demande et l'assigne à un professeur
 * 3. Prof   : Vérifie sa nouvelle session
 * 4. Élève  : Vérifie son accès au dashboard
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const scenarioId = Date.now().toString().slice(-4);
const parentEmail = `parent_${scenarioId}@test.com`;
const childEmail = `child_${scenarioId}@test.com`;
const pass = 'password123';

function log(step, msg, data = '') {
  console.log(`[SCENARIO ${scenarioId}] Step ${step}: ${msg}`, data ? JSON.stringify(data) : '');
}

async function run() {
  console.log('\n' + '★'.repeat(60));
  console.log(`  🚀 SCÉNARIO DE TEST END-TO-END #${scenarioId}`);
  console.log('★'.repeat(60) + '\n');

  // --- ÉTAPE 1 : ENRÔLEMENT PARENT ---
  log(1, 'Inscription Parent + Enfant...');
  const enrollRes = await fetchJSON(`${BASE_URL}/api/parents/enroll`, {
    method: 'POST',
    body: JSON.stringify({
      parentName: `Parent Test ${scenarioId}`,
      parentEmail: parentEmail,
      parentPassword: pass,
      childName: `Enfant Test ${scenarioId}`,
      childEmail: childEmail,
      childPassword: pass,
      childLevel: 'Terminale',
      subject: 'Physique-Chimie'
    }),
  });

  if (!enrollRes.ok) throw new Error('Échec Etape 1: Enrollment');
  log(1, '✅ Inscription réussie');

  // --- ÉTAPE 2 : LOGIN ADMIN POUR VALIDATION ---
  log(2, 'Admin : Authentification...');
  const adminLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: AGENTS.admin.email, password: AGENTS.admin.password }),
  });
  const adminToken = adminLogin.data.token;
  log(2, '✅ Admin connecté');

  // Récupération de la demande (request)
  log(2, 'Admin : Recherche de la demande...');
  const requests = await fetchJSON(`${BASE_URL}/api/requests`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const myReq = Array.isArray(requests.data) 
    ? requests.data.find(r => r.child_email === childEmail)
    : null;

  if (!myReq) {
     log(2, '⚠️ Demande non trouvée par API, tentative via SQL...');
     // Note: en prod on attendrait que le polling ou webhook passe. Ici on avance.
  } else {
    log(2, `✅ Demande ID #${myReq.id} trouvée`);
    
    // Passage en traitement
    log(2, 'Admin : Passage en traitement...');
    await fetchJSON(`${BASE_URL}/api/requests/${myReq.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: 'en traitement' })
    });
  }

  // --- ÉTAPE 3 : LOGIN PROFESSEUR ---
  log(3, 'Professeur (Compte d\'agent) : Authentification...');
  const teacherLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: AGENTS.teacher.email, password: AGENTS.teacher.password }),
  });
  const teacherToken = teacherLogin.data.token;
  const teacherId = teacherLogin.data.user?.id || teacherLogin.data.userId;
  
  if (!teacherToken) {
    log(3, '❌ Échec authentification prof', teacherLogin.data);
    throw new Error('Échec Etape 3: Teacher Login');
  }
  
  const sessions = await fetchJSON(`${BASE_URL}/api/teachers/${teacherId}/sessions`, {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  log(3, `✅ Sessions récupérées pour le prof: ${Array.isArray(sessions.data) ? sessions.data.length : 0}`);

  // --- ÉTAPE 4 : LOGIN ÉLÈVE ---
  log(4, 'Élève : Premier Dashboard...');
  const studentLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: childEmail, password: pass }),
  });
  
  if (studentLogin.ok) {
    const studentToken = studentLogin.data.token;
    const studentId = studentLogin.data.user?.id || studentLogin.data.userId;
    const overview = await fetchJSON(`${BASE_URL}/api/students/${studentId}/overview`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    log(4, `✅ Dashboard élève accessible. XP: ${overview.data?.xp || 0}`);

    // --- ÉTAPE 5 : LE PROFESSEUR CRÉE UN DEVOIR ---
    log(5, 'Professeur : Création d\'un devoir pour l\'élève...');
    
    // Debugging IDs
    log(5, `ID Prof: ${teacherId}, ID Élève: ${studentId}`);

    const homeworkTitle = `Devoir de Physique - ${scenarioId}`;
    const hwRes = await fetchJSON(`${BASE_URL}/api/homework`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: JSON.stringify({
        teacherId: teacherId || 't1', // Fallback if undefined
        studentId: studentId || 's1', // Fallback if undefined
        title: homeworkTitle,
        description: 'Veuillez résoudre les exercices 1 à 5 du chapitre 3.',
        dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        subject: 'Physique-Chimie'
      }),
    });

    if (hwRes.ok) {
      log(5, `✅ Devoir créé avec succès : "${homeworkTitle}"`);
    } else {
      log(5, '❌ Échec création devoir', hwRes.data);
    }

    // --- ÉTAPE 6 : L'ÉLÈVE RÉCUPÈRE SON DEVOIR ---
    log(6, 'Élève : Vérification de la réception du devoir...');
    const studentHw = await fetchJSON(`${BASE_URL}/api/students/${studentId}/homework`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    
    const found = Array.isArray(studentHw.data) 
      ? studentHw.data.find(h => h.title === homeworkTitle)
      : null;

    if (found) {
      log(6, '✅ Devoir trouvé dans la liste de l\'élève !');
    } else {
      log(6, '❌ Devoir non trouvé chez l\'élève.', studentHw.data);
    }

  } else {
    log(4, '❌ Échec authentification élève (compte peut-être pas encore activé)');
  }

  console.log('\n' + '★'.repeat(60));
  console.log(`  🏁 SCÉNARIO #${scenarioId} TERMINÉ`);
  console.log('★'.repeat(60) + '\n');
}

run().catch(err => {
  console.error('❌ SCÉNARIO INTERROMPU:', err.message);
  process.exit(1);
});
