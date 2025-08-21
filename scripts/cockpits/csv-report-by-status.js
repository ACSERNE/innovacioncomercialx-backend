#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

console.log(chalk.blue.bold("\n📊 Reporte técnico cruzado - CSV"));

const files = [
  { name: "UUID Check", path: "../logs/uuid-check-history.csv" },
  { name: "Docker Health", path: "../logs/docker-health-history.csv" }
];

files.forEach(({ name, path: relPath }) => {
  const fullPath = path.join(__dirname, relPath);
  console.log("\n🔎 " + chalk.yellow(name));

  if (!fs.existsSync(fullPath)) {
    console.log(chalk.red("❌ Archivo no encontrado: " + relPath));
    return;
  }

  const rows = fs.readFileSync(fullPath, "utf8").trim().split("\n");
  const header = rows[0].split(",");
  const data = rows.slice(1);

  if (data.length === 0) {
    console.log(chalk.gray("⚠️ Sin registros en el CSV"));
    return;
  }

  let fails = 0;

  data.slice(-5).forEach((line) => {
    const values = line.split(",");
    const timestamp = values[0];
    let status;

    if (name === "UUID Check") {
      const ok = values[4] === "true";
      status = ok ? chalk.green("🟢 OK") : chalk.red("🔴 FAIL");
      if (!ok) fails++;
      console.log("• " + chalk.gray(timestamp) + " → " + status + " → Usuario: " + values[1] + ", UUID: " + values[3]);
    }

    if (name === "Docker Health") {
      const active = values[3] === "true";
      status = active ? chalk.green("🟢 Activo") : chalk.red("🔴 Inactivo");
      if (!active) fails++;
      console.log("• " + chalk.gray(timestamp) + " → " + status + " → " + chalk.gray(values[1]) + " → " + values[2]);
    }
  });

  if (fails === 0) {
    console.log(chalk.green("\n✅ Todo en orden en los últimos registros"));
  } else {
    console.log(chalk.red("\n❌ Fallas detectadas en los últimos registros: " + fails));
    console.log(chalk.magenta("➡️ Revisa el log correspondiente en /logs"));
  }
});

console.log("\n🧭 Panel CSV cruzado listo. Puedes integrarlo como [7] en tu main-router-cli.js");
