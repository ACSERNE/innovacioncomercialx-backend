#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");
require("dotenv").config();

const timestamp = new Date().toISOString();
const logDir = path.join(__dirname, "../logs");
const logFile = path.join(logDir, \`uuid-check-\${Date.now()}.log\`);
const csvFile = path.join(logDir, "uuid-check-history.csv");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logs = [];
const status = { user: false, password: false, uuid: false };

const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;

if (!user || typeof user !== "string") {
  logs.push("❌ Error: PGUSER no definido o no es string.");
} else {
  status.user = true;
  logs.push("✅ PGUSER definido correctamente.");
}

if (!password || typeof password !== "string") {
  logs.push("❌ Error: PGPASSWORD no definido o no es string.");
} else {
  status.password = true;
  logs.push("✅ PGPASSWORD definido correctamente.");
}

try {
  const output = execSync(\`psql "\${process.env.DATABASE_URL}" -c "SELECT uuid_generate_v4();"\`).toString();
  if (/uuid_generate_v4/.test(output)) {
    status.uuid = true;
    logs.push("✅ Función uuid_generate_v4() está disponible.");
  } else {
    logs.push("❌ Error: uuid_generate_v4 no presente en la salida.");
  }
} catch (err) {
  logs.push(\`❌ Error de conexión o función ausente: \${err.message}\`);
}

const finalStatus = status.user && status.password && status.uuid;
const color = finalStatus ? chalk.bgGreen.black : chalk.bgRed.white;
logs.push("\\n📊 Resultado final:");
logs.push(color(finalStatus ? "🟢 Listo para ejecutar seeds o migraciones" : "🔴 No seguro para operaciones sensibles"));

fs.writeFileSync(logFile, \`📦 Verificación de uuid_generate_v4() - \${timestamp}\\n\` + logs.join("\\n"));
console.log(logs.join("\\n"));

const csvHeader = "timestamp,pguser_ok,pgpassword_ok,uuid_ok,status\\n";
const csvRow = \`\${timestamp},\${status.user},\${status.password},\${status.uuid},\${finalStatus}\\n\`;
if (!fs.existsSync(csvFile)) fs.writeFileSync(csvFile, csvHeader);
fs.appendFileSync(csvFile, csvRow);
