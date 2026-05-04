#!/usr/bin/env node
/**
 * 🚀 ORCHESTRATEUR — Care4Success Multi-Agent Testing
 * Lance tous les agents en série et génère un rapport global HTML
 *
 * Usage :
 *   node run-all-agents.mjs           → tous les agents
 *   node run-all-agents.mjs admin     → seulement l'agent admin
 *   node run-all-agents.mjs teacher student  → plusieurs agents
 */

import { spawn, exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { AGENTS } from './config.mjs';
import { generateHTMLReport } from './report-generator.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sélection des agents à lancer
const args = process.argv.slice(2);
const selectedKeys = args.length > 0
  ? args.filter(a => AGENTS[a])
  : Object.keys(AGENTS);

if (selectedKeys.length === 0) {
  console.error('❌ Aucun agent valide spécifié. Options :', Object.keys(AGENTS).join(', '));
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Lance un agent dans un sous-processus
// ─────────────────────────────────────────────────────────────
function runAgent(key) {
  const agent = AGENTS[key];
  const agentPath = path.join(__dirname, agent.file);
  const startTime = Date.now();

  return new Promise((resolve) => {
    const child = spawn('node', [agentPath], { stdio: 'inherit' });

    child.on('close', (code) => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      resolve({
        key,
        icon: agent.icon,
        label: agent.name,
        exitCode: code,
        success: code === 0,
        elapsed: `${elapsed}s`,
      });
    });

    child.on('error', (err) => {
      resolve({
        key,
        icon: agent.icon,
        label: agent.name,
        exitCode: -1,
        success: false,
        error: err.message,
        elapsed: '?',
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
async function main() {
  const globalStartTime = Date.now();

  console.log('\n' + '╔' + '═'.repeat(58) + '╗');
  console.log('║  🔬 CARE4SUCCESS — TEST MULTI-AGENTS' + ' '.repeat(21) + '║');
  console.log(`║  URL : https://care4success.usra-care.com` + ' '.repeat(16) + '║');
  console.log(`║  Agents : ${selectedKeys.map(k => AGENTS[k].icon + ' ' + AGENTS[k].name).join(', ')}`.padEnd(59) + '║');
  console.log('╚' + '═'.repeat(58) + '╝\n');

  // Lancement des agents
  const results = [];
  for (const key of selectedKeys) {
    console.log(`\n${'▶'.repeat(3)} Démarrage agent : ${AGENTS[key].icon} ${AGENTS[key].name}`);
    const result = await runAgent(key);
    results.push(result);
  }

  // ── Statistiques ──────────────────────────────────────────
  const total = results.length;
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const totalDuration = ((Date.now() - globalStartTime) / 1000).toFixed(1);
  const successRate = Math.round((passed / total) * 100);

  // ── Rapport console ────────────────────────────────────────
  console.log('\n\n' + '╔' + '═'.repeat(58) + '╗');
  console.log('║  📊 RAPPORT GLOBAL — RÉSUMÉ DES AGENTS' + ' '.repeat(19) + '║');
  console.log('╠' + '═'.repeat(58) + '╣');
  console.log(`║  ${'Agent'.padEnd(20)} ${'Statut'.padEnd(12)} ${'Durée'.padEnd(8)} ║`);
  console.log('╠' + '─'.repeat(58) + '╣');
  results.forEach(r => {
    const status = r.success ? '✅ OK' : '❌ FAIL';
    console.log(`║  ${(r.icon + ' ' + r.label).padEnd(20)} ${status.padEnd(12)} ${r.elapsed.padEnd(8)} ║`);
  });
  console.log('╠' + '═'.repeat(58) + '╣');
  console.log(`║  Réussis : ${passed}/${total}`.padEnd(59) + '║');
  console.log(`║  Durée totale : ${totalDuration}s`.padEnd(59) + '║');
  console.log('╚' + '═'.repeat(58) + '╝\n');

  // ── Génération du rapport HTML ─────────────────────────────
  const stats = {
    total,
    passed,
    duration: `${totalDuration}s`,
    rate: successRate
  };
  
  try {
    const reportPath = generateHTMLReport(results, stats);
    console.log(`📄 Rapport HTML généré : ${reportPath}`);
    
    // Ouverture automatique sur Windows
    exec(`start "" "${reportPath}"`);
  } catch (err) {
    console.error('❌ Échec génération rapport HTML:', err.message);
  }

  // ── Notification Email (Simulée) ───────────────────────────
  console.log('\n📧 [NOTIFICATION EMAIL]');
  if (failed > 0) {
    console.log(`   🚨 ALERTE : ${failed} agent(s) ont échoué !`);
    console.log(`   Agents en échec : ${results.filter(r => !r.success).map(r => r.label).join(', ')}`);
  } else {
    console.log('   ✅ TOUT EST OK : Santé de l\'application confirmée.');
  }

  process.exit(failed === 0 ? 0 : 1);
}

main().catch(console.error);
