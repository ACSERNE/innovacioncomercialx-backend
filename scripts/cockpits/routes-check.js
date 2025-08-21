#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

console.log(chalk.blue.bold("\n🛣️ Validación de rutas Express"));

try {
  const routesPath = path.join(__dirname, "../../routes");
  if (!fs.existsSync(routesPath)) throw new Error("Directorio /routes no encontrado");

  const files = fs.readdirSync(routesPath).filter(f => f.endsWith(".js"));
  if (files.length === 0) throw new Error("No se encontraron archivos .js en /routes");

  console.log(chalk.green("✅ Rutas detectadas: " + files.length + "\n"));
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const code = fs.readFileSync(path.join(routesPath, file), "utf8");
    const exposed = /(app|router)\.(get|post|put|delete)\(/.test(code);
    const semaforo = exposed ? "🟢" : "🔴";
    const color = exposed ? chalk.green : chalk.red;
    console.log(semaforo + " " + chalk.gray(file) + " → " + color(exposed ? "rutas activas" : "sin exposición"));
  }

} catch (err) {
  console.log(chalk.red("❌ Error al validar rutas: " + err.message));
}
