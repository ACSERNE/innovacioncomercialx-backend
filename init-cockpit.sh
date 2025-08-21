#!/bin/bash
echo -e "\n🚀 Iniciando estructura CLI cockpit...\n"

mkdir -p commands logger logs

touch router-cli.js logs/router-cli.csv
touch commands/{dbMigrate.js,seedAll.js,qaPaths.js,envValidator.js,connectivityCheck.js}
touch logger/csvLogger.js

cat << 'EOF' > logger/csvLogger.js
const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '..', 'logs', 'router-cli.csv');
function logExecution(command) {
  const timestamp = new Date().toISOString();
  const logLine = \`"\${timestamp}","\${command}"\n\`;
  fs.appendFileSync(logPath, logLine);
}
module.exports = { logExecution };
EOF

echo -e "\n✅ Estructura cockpit creada correctamente.\n"
