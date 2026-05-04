import fs from 'fs';
import path from 'path';

/**
 * 📊 Générateur de rapport HTML Premium pour Care4Success
 */
export function generateHTMLReport(results, stats) {
  const dateStr = new Date().toLocaleString('fr-FR');
  const timestamp = Date.now();
  
  const rows = results.map(res => `
    <div class="agent-card ${res.success ? 'success' : 'fail'}">
      <div class="agent-header">
        <span class="agent-icon">${res.icon}</span>
        <span class="agent-name">${res.label}</span>
        <span class="agent-status-badge">${res.success ? 'RÉUSSI' : 'ÉCHEC'}</span>
      </div>
      <div class="agent-meta">
        <span>🕒 Durée : ${res.elapsed}</span>
        <span>🔑 Rôle : ${res.key}</span>
      </div>
    </div>
  `).join('');

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport Multi-Agents — Care4Success</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0f172a;
            --card-bg: #1e293b;
            --primary: #38bdf8;
            --success: #10b981;
            --fail: #ef4444;
            --text: #f8fafc;
        }
        body {
            font-family: 'Outfit', sans-serif;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .container {
            width: 100%;
            max-width: 900px;
        }
        header {
            text-align: center;
            margin-bottom: 50px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: var(--card-bg);
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
        }
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.6;
        }
        .agents-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
        }
        .agent-card {
            background: var(--card-bg);
            padding: 20px;
            border-radius: 16px;
            border-left: 6px solid #ccc;
            transition: transform 0.2s;
        }
        .agent-card:hover {
            transform: translateX(5px);
        }
        .agent-card.success { border-left-color: var(--success); }
        .agent-card.fail { border-left-color: var(--fail); }
        
        .agent-header {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .agent-icon { font-size: 1.8rem; }
        .agent-name { font-size: 1.2rem; font-weight: 600; flex-grow: 1; }
        .agent-status-badge {
            font-size: 0.8rem;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 20px;
            background: rgba(255,255,255,0.05);
        }
        .success .agent-status-badge { color: var(--success); background: rgba(16, 185, 129, 0.1); }
        .fail .agent-status-badge { color: var(--fail); background: rgba(239, 68, 68, 0.1); }

        .agent-meta {
            margin-top: 10px;
            font-size: 0.85rem;
            opacity: 0.5;
            display: flex;
            gap: 20px;
        }
        footer {
            margin-top: 60px;
            text-align: center;
            opacity: 0.4;
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🔬 Care4Success Audit</h1>
            <p>Rapport de santé multi-agents — ${dateStr}</p>
        </header>

        <div class="summary-grid">
            <div class="stat-card">
                <div class="stat-value">${stats.passed}/${stats.total}</div>
                <div class="stat-label">Agents Réussis</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.duration}</div>
                <div class="stat-label">Durée Totale</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.rate}%</div>
                <div class="stat-label">Taux de Succès</div>
            </div>
        </div>

        <div class="agents-list">
            ${rows}
        </div>

        <footer>
            Généré automatiquement par le Multi-Agent Explorer &copy; 2026
        </footer>
    </div>
</body>
</html>
  `;

  const reportPath = path.join(process.cwd(), '_agents', 'care4success', 'reports', `report-${timestamp}.html`);
  fs.writeFileSync(reportPath, html);
  return reportPath;
}
