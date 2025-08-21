const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
require("dotenv").config();

// 🕒 Timestamp para los logs
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

// 🧾 Inicialización de carpetas base
["logs", "csv", "output"].forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
    console.log(`📁 Carpeta creada: ${dir}`);
  }
});

// 🧭 Alias disponibles
const arg = process.argv[2];
const mode = {
  help: () => cliHelp(),
  qa: () => runModules(["qaPaths", "envValidator", "connectivityCheck"]),
  db: () => runModules(["dbMigrate", "seedAll"]),
  all: () => runModules([
    "dbMigrate",
    "seedAll",
    "qaPaths",
    "envValidator",
    "connectivityCheck"
  ])
};

if (mode[arg]) {
  mode[arg]();
  return;
}

// 📋 Función principal de ejecución
function runModules(modules) {
  const summary = [];

  modules.forEach((name) => {
    try {
      console.log(chalk.yellow(`🟡 Ejecutando módulo: ${name}`));
      const modPath = path.join(__dirname, "commands", `${name}.js`);
      const mod = require(modPath);
      if (typeof mod === "function") mod();
      logStatus(name, "OK");
      console.log(chalk.green(`🟢 ${name} ejecutado correctamente.\n`));
    } catch (err) {
      logStatus(name, "ERROR", err.message);
      console.log(chalk.red(`🔴 ${name} falló: ${err.message}\n`));
    }
  });

  renderPanel(summary);
  renderFinalBadge(summary);
  exportMarkdown(summary);

  function logStatus(module, status, message = "") {
    const logLine = `${timestamp},${module},${status},"${message}"\n`;
    const logFile = path.join(__dirname, "csv", "execution-log.csv");
    fs.appendFileSync(logFile, logLine);
    summary.push({ module, status, message });
  }
}

// 🎛️ Panel visual con semáforos
function renderPanel(summary) {
  console.log(chalk.bold("\n🎛️ Panel Cockpit Visual\n"));
  summary.forEach(({ module, status, message }) => {
    let icon = "⚪";
    let color = chalk.gray;
    if (status === "OK") {
      icon = "🟢";
      color = chalk.green;
    } else if (status === "ERROR") {
      icon = "🔴";
      color = chalk.red;
    }
    console.log(color(`${icon} ${module.padEnd(20)} → ${status}${message ? ` (${message})` : ""}`));
  });
}

// ✅ Insignia y sugerencias al final
function renderFinalBadge(summary) {
  const errors = summary.filter(s => s.status === "ERROR");

  if (errors.length === 0) {
    console.log(chalk.green.bold("\n✅ Todos los módulos ejecutados correctamente."));
  } else {
    console.log(chalk.yellow.bold("\n⚠️ Módulos con errores detectados:"));
    errors.forEach(({ module, message }) => {
      console.log(chalk.red(`🔴 ${module}: ${message}`));
      if (module === "connectivityCheck")
        console.log(chalk.gray("🛠️ Sugerencia: Verifica DATABASE_URL y conexión PostgreSQL."));
      if (module === "envValidator")
        console.log(chalk.gray("⚙️ Sugerencia: Completa las variables faltantes en .env."));
      if (module === "qaPaths")
        console.log(chalk.gray("📁 Sugerencia: Crea carpetas logs/, csv/, output/."));
    });
  }
}

// 📘 Exportación Markdown técnica
function exportMarkdown(summary) {
  const mdLines = [
    `# 📊 Cockpit Execution Report`,
    `**Fecha:** ${timestamp}`,
    `\n| Módulo | Estado | Mensaje |`,
    `|--------|--------|---------|`
  ];
  summary.forEach(({ module, status, message }) => {
    const emoji = status === "OK" ? "🟢" : "🔴";
    mdLines.push(`| ${module} | ${emoji} ${status} | ${message || ""} |`);
  });
  const outputPath = path.join(__dirname, "output", "execution-report.md");
  fs.writeFileSync(outputPath, mdLines.join("\n"));
  console.log(chalk.blue(`📘 Reporte Markdown generado en output/execution-report.md\n`));
}

// 🧭 Panel de ayuda CLI
function cliHelp() {
  console.log(chalk.bold("\n🧭 Cockpit CLI - Comandos disponibles\n"));
  const helpItems = [
    { cmd: "dbMigrate", desc: "🔄 Ejecuta migraciones vía Sequelize" },
    { cmd: "seedAll", desc: "🌱 Aplica todos los seeders definidos" },
    { cmd: "qaPaths", desc: "🔍 Verifica carpetas clave: logs/, csv/, output/" },
    { cmd: "envValidator", desc: "🧪 Valida variables esenciales en el archivo .env" },
    { cmd: "connectivityCheck", desc: "📡 Testea conexión PostgreSQL y uuid_generate_v4()" },
  ];
  helpItems.forEach(({ cmd, desc }) =>
    console.log(chalk.cyan(`🔸 ${cmd.padEnd(18)} → ${desc}`))
  );
  console.log(chalk.gray("\n📊 Logs automáticos en: cockpit/csv/execution-log.csv"));
  console.log(chalk.gray("📘 Panel técnico exportado en: cockpit/output/execution-report.md\n"));
}