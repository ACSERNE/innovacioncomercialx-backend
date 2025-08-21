#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

console.log(chalk.blue.bold("\n📓 Visualizador de logs por timestamp"));

try {
  const logPath = path.join(__dirname, "../logs");
  if (!fs.existsSync(logPath)) throw new Error("No se encontró el directorio /logs");

  const files = fs.readdirSync(logPath).filter(f => f.endsWith(".log"));
  if (files.length === 0) throw new Error("No hay archivos de log");

  files.sort().reverse().slice(0, 5).forEach((f, i) => {
    const content = fs.readFileSync(path.join(logPath, f), "utf8");
    console.log("\n🧾 " + chalk.yellow(f));
    console.log(chalk.gray(content.split("\n").slice(0, 5).join("\n")));
  });

} catch (err) {
  console.log(chalk.red("❌ Error al mostrar logs: " + err.message));
}
