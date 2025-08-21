// scripts/utils/compare-database-url-cli.js
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const readline = require("readline");

// Carga segura de .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const envUrl = process.env.DATABASE_URL;

// Opciones disponibles
const options = [
  "logs/v1/database-url-rebuilder.log",
  "logs/v2/database-url-rebuilder.log",
  "logs/desarrollo/database-url-rebuilder.log"
];

// Muestra menú visual
console.log("\n🔎 Selector de log reconstruido:");
options.forEach((opt, idx) => console.log(`[${idx + 1}] ${opt}`));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("\nSelecciona opción (1-3): ", (answer) => {
  const index = parseInt(answer.trim(), 10) - 1;

  // 🛡 Protección anti-input inválido
  if (isNaN(index) || index < 0 || index >= options.length) {
    console.log("❌ Selección inválida. No se seleccionó ninguna opción.");
    rl.close();
    return;
  }

  const selectedRelative = options[index];
  const selectedPath = path.resolve(__dirname, "../../" + selectedRelative);

  if (!fs.existsSync(selectedPath)) {
    console.log("❌ Log no encontrado: " + selectedPath);
    rl.close();
    return;
  }

  const rebuiltUrl = fs.readFileSync(selectedPath, "utf8").trim().split("\n").pop()?.trim();

  console.log("\n📊 Comparación DATABASE_URL:");
  console.log("🧪 .env:         " + envUrl);
  console.log("🔧 Reconstruido: " + rebuiltUrl);

  if (!envUrl || !rebuiltUrl) {
    console.log("⚠️ Faltan datos.");
    rl.close();
    return;
  }

  if (envUrl === rebuiltUrl) {
    console.log("\n✅ Coinciden. Ambiente sincronizado.");
  } else {
    console.log("\n❌ Diferencia detectada.");
    const timestamp = new Date().toISOString();
    const csvPath = path.resolve(__dirname, "../logs/database-url-comparison.csv");
    const header = "timestamp,status,env_url,rebuilt_url\n";
    const row = `${timestamp},NO MATCH,"${envUrl}","${rebuiltUrl}"\n`;
    if (!fs.existsSync(csvPath)) fs.writeFileSync(csvPath, header);
    fs.appendFileSync(csvPath, row);
    console.log("📁 Auditoría guardada: logs/database-url-comparison.csv");
  }

  rl.close();
});