const fs = require("fs");
const path = require("path");
require("dotenv").config();

const logDir = path.join(__dirname, "..", "logs");
const logFile = path.join(logDir, "database-url-rebuilder.log");

// Asegurar carpeta logs
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

// Capturar variables individuales
const {
  DB_USER = "admin",
  DB_PASSWORD = "1234",
  DB_HOST = "localhost",
  DB_PORT = "5432",
  DB_NAME = "innovacioncomercialx",
  DATABASE_URL
} = process.env;

// Reconstruir DATABASE_URL desde partes
const reconstruida = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Generar mensaje de comparación
let output = `🧪 Comparador de DATABASE_URL\n`;
output += `Actual (.env):       ${DATABASE_URL || "undefined"}\n`;
output += `Reconstruida manual: ${reconstruida}\n\n`;

if (!DATABASE_URL) {
  output += "⚠️ DATABASE_URL no está definida en .env\n";
} else if (DATABASE_URL !== reconstruida) {
  output += "❌ DATABASE_URL mismatch\n";
} else {
  output += "✅ DATABASE_URL coincide con la reconstrucción\n";
}

// Escribir log
fs.writeFileSync(logFile, output, "utf8");
console.log("📝 Resultado escrito en logs/database-url-rebuilder.log");
