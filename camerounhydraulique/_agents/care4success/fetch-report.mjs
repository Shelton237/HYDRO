import { execSync, exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const remotePath = '/var/www/CARE4SUCESS/_agents/care4success/reports';
const localPath = path.join(process.cwd(), '_agents', 'care4success', 'reports');

console.log('🔍 Recherche du dernier rapport sur le serveur...');

try {
  // Trouver le fichier le plus récent sur le serveur
  const lastReport = execSync(`ssh -o StrictHostKeyChecking=no saturnin@155.117.46.218 "ls -t ${remotePath}/*.html | head -n 1"`).toString().trim();

  if (!lastReport) {
    console.error('❌ Aucun rapport trouvé sur le serveur.');
    process.exit(1);
  }

  const filename = path.basename(lastReport);
  console.log(`📥 Téléchargement de : ${filename}...`);

  // Télécharger le fichier
  execSync(`scp -o StrictHostKeyChecking=no saturnin@155.117.46.218:${lastReport} "${localPath}/${filename}"`);

  console.log('✅ Rapport récupéré avec succès !');
  console.log(`📂 Emplacement : ${localPath}/${filename}`);

  // Ouvrir le rapport
  if (process.platform === 'win32') {
    exec(`start "" "${localPath}/${filename}"`);
  } else {
    exec(`xdg-open "${localPath}/${filename}"`);
  }

} catch (err) {
  console.error('❌ Erreur lors de la récupération du rapport :', err.message);
}
