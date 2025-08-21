#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const baseDir = path.resolve(__dirname, "../../");
const envFiles = fs.readdirSync(baseDir).filter(f => f.startsWith(".env"));

console.log(chalk.blue.bold("\n🧭 Selector de entorno (.env)"));

if (envFiles.length === 0) {
  console.log(chalk.red("❌ No se encontraron archivos .env"));
  process.exit(1);
}

envFiles.forEach((f, i) => {
  console.log(chalk.yellow("[" + (i + 1) + "] ") + chalk.gray(f));
});

rl.question(chalk.cyan("\nSelecciona el entorno que quieres activar: "), (answer) => {
  const index = parseInt(answer) - 1;
  const fileSelected = envFiles[index];

  if (!fileSelected) {
    console.log(chalk.red("❌ Selección inválida"));
    rl.close();
    return;
  }

  const origin = path.join(baseDir, fileSelected);
  const target = path.join(baseDir, ".env");

  fs.copyFileSync(origin, target);
  console.log(chalk.green("✅ Activado: " + fileSelected + " → .env"));

  try {
    execSync("node scripts/validators/env-connection-check.js", { stdio: "inherit" });
  } catch (err) {
    console.log(chalk.red("⚠️ Error al ejecutar env-connection-check.js"));
  }

  rl.close();
});
