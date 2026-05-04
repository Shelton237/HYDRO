crontab -l > mycron 2>/dev/null || true
echo "0 * * * * cd /var/www/CARE4SUCESS && /usr/bin/node _agents/care4success/run-all-agents.mjs >> /var/www/CARE4SUCESS/_agents/care4success/cron.log 2>&1" >> mycron
crontab mycron
rm mycron
echo "✅ Cron job installé avec succès."
