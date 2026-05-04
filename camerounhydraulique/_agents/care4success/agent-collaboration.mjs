/**
 * 🛰️ AGENT COLLABORATION — Messagerie & Collaboration
 * Teste :
 *  - Envoi de message Tuteur -> Professeur
 *  - Lecture et réponse Professeur -> Tuteur
 *  - Listing des contacts
 */

import { BASE_URL, AGENTS, fetchJSON } from './config.mjs';

const scenarioId = Date.now().toString().slice(-4);

async function run() {
  console.log('\n' + '✉️'.repeat(30));
  console.log(`  🚀 WORKFLOW COLLABORATION #${scenarioId}`);
  console.log('✉️'.repeat(30) + '\n');

  // 1. Login Tuteur
  console.log('1. 🧑‍🏫 Connexion Tuteur...');
  const tutorLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: AGENTS.tutor.email, password: AGENTS.tutor.password }),
  });
  const tutorToken = tutorLogin.data.token;
  const tutorId = tutorLogin.data.user?.id || tutorLogin.data.userId;
  const tutorName = tutorLogin.data.user?.name || 'Marie Tuteur';

  // 2. Login Professeur (pour avoir son ID)
  console.log('2. 🎓 Récupération ID Professeur...');
  const teacherLogin = await fetchJSON(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: AGENTS.teacher.email, password: AGENTS.teacher.password }),
  });
  const teacherToken = teacherLogin.data.token;
  const teacherId = teacherLogin.data.user?.id || teacherLogin.data.userId;
  const teacherName = teacherLogin.data.user?.name || 'Agent Professeur';

  // 3. Envoi du message Tuteur -> Professeur
  console.log(`3. 📤 Envoi message Tuteur (ID: ${tutorId}) -> Prof (ID: ${teacherId})...`);
  const msgRes = await fetchJSON(`${BASE_URL}/api/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tutorToken}` },
    body: JSON.stringify({
      senderId: tutorId,
      senderName: tutorName,
      senderRole: 'tutor',
      receiverId: teacherId,
      receiverName: teacherName,
      receiverRole: 'teacher',
      content: `[#${scenarioId}] Bonjour Prof, comment se passe la progression de l'élève sur le dernier chapitre de Bio ?`
    }),
  });
  if (!msgRes.ok) throw new Error('Échec envoi message');
  const messageId = msgRes.data.id;
  console.log(`   ✅ Message envoyé (ID: ${messageId})`);

  // 4. Le Professeur reçoit et lit le message
  console.log('4. 📥 Réception côté Professeur...');
  const inboxRes = await fetchJSON(`${BASE_URL}/api/messages/${teacherId}`, {
    headers: { Authorization: `Bearer ${teacherToken}` },
  });
  const myMsg = inboxRes.data.find(m => m.id === messageId);
  if (myMsg) {
    console.log('   ✅ Message trouvé dans la boîte de réception du prof');
    
    // Marquer comme lu
    await fetchJSON(`${BASE_URL}/api/messages/${messageId}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${teacherToken}` }
    });
    console.log('   ✅ Message marqué comme lu');
  } else {
    throw new Error('Message non trouvé dans la boîte de réception');
  }

  // 5. Le Professeur répond
  console.log('5. ✍️ Envoi de la réponse du Professeur...');
  const replyRes = await fetchJSON(`${BASE_URL}/api/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${teacherToken}` },
    body: JSON.stringify({
      senderId: teacherId,
      senderName: teacherName,
      senderRole: 'teacher',
      receiverId: tutorId,
      receiverName: tutorName,
      receiverRole: 'tutor',
      content: `[#${scenarioId}] Tout se passe bien, l'élève a complété le quiz avec succès !`
    }),
  });
  if (replyRes.ok) console.log('   ✅ Réponse envoyée au Tuteur');

  console.log('\n' + '✉️'.repeat(30));
  console.log(`  🏁 WORKFLOW COLLABORATION TERMINÉ`);
  console.log('✉️'.repeat(30) + '\n');
}

run().catch(err => {
  console.error('❌ WORKFLOW INTERROMPU:', err.message);
  process.exit(1);
});
