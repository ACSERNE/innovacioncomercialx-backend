#!/usr/bin/env node

const chalk = require("chalk");
const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const panels = [
  { name: "🔍 Validar entorno UUID + semáforo", command: "node scripts/validators/uuid-env-check-logger.js" },
  { name: "📊 Dashboard QA histórico UUID", command: "node scripts/cockpits/uuid-dashboard-cli.js" },
  { name: "📡 Health-check de contenedores", command: "node scripts/cockpits/containers-health.js" },
  { name: "📁 Auditoría de seeds", command: "node scripts/cockpits/seeds-check.js" },
  { name: "🛣️ Validación de rutas Express", command: "node scripts/cockpits/routes-check.js" },
  { name: "📓 Logs y reportes por timestamp", command: "node scripts/cockpits/log-viewer.js" }
];

console.log(chalk.blue.bold("\\n🧭 Cockpit CLI - Multipanel QA"));
panels.forEach((p, i) => {
  console.log(\`\${chalk.yellow(\`[\${i + 1}]\`)} \${p.name}\`);
});

rl.question(chalk.cyan("\\nSelecciona una opción: "), (answer) => {
  const index = parseInt(answer) - 1;
  const panel = panels[index];

  if (!panel) {
    console.log(chalk.red("❌ Opción inválida"));
    rl.close();
    return;
  }

  console.log(chalk.green(\`\\n🚀 Ejecutando: \${panel.name}\\n\`));
  try {
    execSync(panel.command, { stdio: "inherit" });
  } catch (err) {
    console.log(chalk.red("⚠️ Error al ejecutar el panel."));
  }

  rl.close();
});
