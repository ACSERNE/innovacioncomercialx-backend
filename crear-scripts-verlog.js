const fs = require("fs");
const path = require("path");

// 🔧 Archivos a crear
const scripts = {
  "scripts/ver-log-selector.js": `const fs = require("fs");

module.exports = function verLog() {
  const logPath = "logs/database-url-rebuilder.log";
  if (!fs.existsSync(logPath)) {
    console.log("❌ Log no disponible:", logPath);
    return;
  }

  const content = fs.readFileSync(logPath, "utf8");
  console.log("\\n📄 Log detectado:\\n");
  console.log(content);

  try {
    const { analizarLog } = require("./analizar-log");
    analizarLog(content);
  } catch (e) {}
};`,

  "scripts/analizar-log.js": `module.exports = {
  analizarLog(content) {
    const lines = content.split("\\n");
    const errores = lines.filter(line => /error|fail|missing|undefined/i.test(line));
    const syncIssues = lines.filter(line => /DATABASE_URL.*(no match|mismatch|invalid)/i.test(line));

    if (errores.length > 0) {
      console.warn("\\n⚠️ Errores detectados:");
      errores.forEach(line => console.log("🔴", line));
    }

    if (syncIssues.length > 0) {
      console.warn("\\n🔄 Desincronización detectada:");
      syncIssues.forEach(line => console.log("🟡", line));
    }

    if (errores.length === 0 && syncIssues.length === 0) {
      console.log("\\n✅ Log limpio.");
    }
  }
};`
};

// ✅ Crear carpetas y archivos
Object.entries(scripts).forEach(([filePath, content]) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log("📁 Creado:", filePath);
  } else {
    console.log("⚠️ Ya existe:", filePath);
  }
});

// ⚙️ Crear o actualizar router-cli.js
const routerPath = "router-cli.js";
const verLogImport = `const verLog = require("./scripts/ver-log-selector");`;
const verLogCommand = `if (command === "ver-log") verLog();`;

if (!fs.existsSync(routerPath)) {
  const code = `${verLogImport}
const command = process.argv[2];
${verLogCommand}
`;
  fs.writeFileSync(routerPath, code);
  console.log("🆕 Creado router-cli.js con comando 'ver-log'");
} else {
  let routerCode = fs.readFileSync(routerPath, "utf8");

  if (!routerCode.includes("ver-log")) {
    const injection = `${verLogImport}
const command = process.argv[2];
${verLogCommand}

`;
    fs.writeFileSync(routerPath, injection + routerCode);
    console.log("🔗 Inyectado comando 'ver-log' en router-cli.js");
  } else {
    console.log("✅ router-cli.js ya tiene el comando 'ver-log'");
  }
}
