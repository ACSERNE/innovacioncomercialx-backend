#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const csvPath = path.join(__dirname, "../logs/uuid-check-history.csv");

if (!fs.existsSync(csvPath)) {
  console.log(chalk.red("❌ No se encontró uuid-check-history.csv"));
  process.exit(1);
}

const lines = fs.readFileSync(csvPath, "utf8").trim().split("\\n").slice(1);

console.log(chalk.blue.bold("\\n🧮 Historial de validaciones uuid_generate_v4()\\n"));
lines.forEach((line) => {
  const [ts, user, pass, uuid, status] = line.split(",");
  const color = status === "true" ? chalk.green : chalk.red;
  const semaforo = status === "true" ? "🟢 OK" : "🔴 FAIL";
  console.log(\`\${chalk.gray(ts)} | \${color(semaforo)} | PGUSER:\${user} PGPASSWORD:\${pass} UUID:\${uuid}\`);
});

console.log("\\n📌 Total de registros:", chalk.yellow(lines.length));

const fails = lines.filter((l) => l.includes("false"));
if (fails.length) {
  console.log(chalk.red("\\n⚠️ Validaciones fallidas detectadas:"));
  fails.forEach((line) => {
    const [ts] = line.split(",");
    console.log(\`❌ \${chalk.gray(ts)} → Usa: node scripts/validators/uuid-env-check-logger.js\`);
  });
} else {
  console.log(chalk.green("\\n✅ Todo validado correctamente en los últimos registros."));
}
