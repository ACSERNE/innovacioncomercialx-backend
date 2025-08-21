#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");

const timestamp = new Date().toISOString();
const logDir = path.join(__dirname, "../logs");
const logFile = path.join(logDir, "docker-health-" + Date.now() + ".log");
const csvFile = path.join(logDir, "docker-health-history.csv");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

console.log(chalk.blue.bold("\n🐳 Health-check Docker"));

let logs = [];
let containers = [];

try {
  const cmd =
    process.platform === "win32"
      ? 'docker ps --format "{{.Names}},{{.Status}}"'
      : "docker ps --format '{{.Names}},{{.Status}}'";

  const output = execSync(cmd).toString().trim();
  if (!output) {
    throw new Error("No hay contenedores activos.");
  }

  const lines = output.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(",");
    const name = parts[0] || "sin-nombre";
    const status = parts[1] || "desconocido";
    const active = /Up|running|healthy/.test(status);
    const semaforo = active ? "🟢" : "🔴";
    const color = active ? chalk.green : chalk.red;
    logs.push(semaforo + " " + chalk.gray(name) + " → " + color(status));
    containers.push({ name, status, active });
  }

} catch (err) {
  logs.push("❌ Error: " + err.message);
}

console.log("\n" + logs.join("\n"));

fs.writeFileSync(logFile, "🐳 Docker Health-check - " + timestamp + "\n" + logs.join("\n"));

const csvHeader = "timestamp,container,status,active\n";
if (!fs.existsSync(csvFile)) {
  fs.writeFileSync(csvFile, csvHeader);
}

for (let i = 0; i < containers.length; i++) {
  const row =
    timestamp +
    "," +
    containers[i].name +
    "," +
    containers[i].status +
    "," +
    containers[i].active +
    "\n";
  fs.appendFileSync(csvFile, row);
}
