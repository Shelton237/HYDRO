#!/usr/bin/env node
// Script de réinitialisation des mots de passe des agents de test
// À exécuter sur le serveur : node /tmp/reset_agent_passwords.mjs

import { createPool } from 'mysql2/promise';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let bcrypt;
try {
  bcrypt = require('/var/www/CARE4SUCESS/node_modules/bcryptjs');
} catch {
  bcrypt = require('bcryptjs');
}

const pool = await createPool({
  host: '127.0.0.1',
  user: 'care4success',
  password: 'Pluton@2015',
  database: 'care4success',
});

const accounts = [
  { email: 'prof@care4success.cm',          password: 'teacher123', role: 'teacher' },
  { email: 'conseiller@care4success.cm',    password: 'advisor123', role: 'advisor' },
  { email: 'tuteur@care4success.cm',        password: 'tutor123',   role: 'tutor'   },
  { email: 'parent@care4success.cm',        password: 'parent123',  role: 'parent'  },
];

console.log('🔑 Réinitialisation des mots de passe agents Care4Success...\n');

for (const acc of accounts) {
  const hash = await bcrypt.hash(acc.password, 10);
  const [result] = await pool.execute(
    'UPDATE users SET password = ? WHERE email = ?',
    [hash, acc.email]
  );
  if (result.affectedRows > 0) {
    console.log(`✅ ${acc.email} → mot de passe: "${acc.password}"`);
  } else {
    console.log(`⚠️  ${acc.email} → compte non trouvé, création...`);
    // Si le compte n'existe pas, on le crée
    const [insert] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = ?',
      [acc.role.charAt(0).toUpperCase() + acc.role.slice(1), acc.email, hash, acc.role, hash]
    );
    console.log(`  → Résultat: ${insert.affectedRows} ligne(s) affectée(s)`);
  }
}

await pool.end();
console.log('\n✅ Terminé ! Tous les comptes agents sont prêts.\n');
