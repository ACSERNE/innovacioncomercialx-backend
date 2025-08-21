#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");

console.log(chalk.blue.bold("\n🌱 Auditoría de seeds"));

try {
  const seedersPath = path.join(__dirname, "../../seeders");
  if (!fs.existsSync(seedersPath)) throw new Error("Directorio /seeders no encontrado");

  const files = fs.readdirSync(seedersPath).filter(f => f.endsWith(".js"));
  if (files.length === 0) throw new Error("No hay archivos de seeds .js en /seeders");

  console.log(chalk.green("✅ Seeds detectados: " + files.length + "\n"));
  for (let i = 0; i < files.length; i++) {
    console.log(chalk.yellow("[" + (i+1) + "]"), chalk.gray(files[i]));
  }

  console.log(chalk.blue("\n🚀 Ejecutando simulación de seeders..."));
  execSync("npx sequelize-cli db:seed:all", { stdio: "inherit" });

} catch (err) {
  console.log(chalk.red("❌ Error de auditoría de seeds: " + err.message));
}
