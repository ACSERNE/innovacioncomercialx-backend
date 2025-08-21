const verLog = require("./scripts/ver-log-selector");
const command = process.argv[2];
if (command === "ver-log") verLog();

function analizarLog(content) {
  const lines = content.split("\n");
  const errores = lines.filter(line => /error|fail|missing|undefined/i.test(line));
  const syncIssues = lines.filter(line => /DATABASE_URL.*(no match|mismatch|invalid)/i.test(line));

  if (errores.length > 0) {
    console.warn("\n⚠️ Errores detectados en el log:");
    errores.forEach(line => console.log("🔴", line));
  }

  if (syncIssues.length > 0) {
    console.warn("\n🔄 Desincronización entre `.env` y URL detectada:");
    syncIssues.forEach(line => console.log("🟡", line));
  }

  if (errores.length === 0 && syncIssues.length === 0) {
    console.log("\n✅ Log limpio, sin conflictos detectados.");
  }
}
// scripts/router-cli.js

const cmd = process.argv[2];
const args = process.argv.slice(3);

if (cmd === 'suggest-table') {
  require('./cockpit/check-or-suggest-table.js'); // llamado sin argumentos porque los toma de terminal
} else if (cmd === 'create-table') {
  require('./cockpit/create-table.js'); // idem arriba
}
