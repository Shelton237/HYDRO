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
  { email: 'prof@care4success.cm', role: 'teacher' },
  { email: 'conseiller@care4success.cm', role: 'advisor' },
  { email: 'tuteur@care4success.cm', role: 'tutor' },
];

console.log('🔄 Synchronisation des tables rôles spécifiques...');

for (const acc of accounts) {
  const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [acc.email]);
  if (rows[0]) {
    const userId = rows[0].id;
    console.log(`👤 User ${acc.email} found (ID: ${userId})`);
    
    // Sync to teachers table if role is relevant
    if (['teacher', 'tutor', 'advisor'].includes(acc.role)) {
      const defaultData = {
        name: acc.email.split('@')[0],
        email: acc.email,
        subjects: JSON.stringify(['Général']),
        level: 'Secondaire',
        city: 'Yaoundé',
        status: 'actif'
      };
      
      await pool.execute(`
        INSERT INTO teachers (id, name, email, subjects, level, city, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE id=id`, 
        [userId, defaultData.name, defaultData.email, defaultData.subjects, defaultData.level, defaultData.city, defaultData.status]
      );
      console.log(`   ✅ Synchronisé dans la table "teachers"`);
    }
  } else {
    console.log(`⚠️ User ${acc.email} not found. Skipping.`);
  }
}

await pool.end();
console.log('✅ Synchronisation terminée.');
