#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { Client } = require("pg");
require("dotenv").config();

const timestamp = new Date().toISOString();
const logDir = path.join(__dirname, "../logs");
const logFile = path.join(logDir, "env-check-" + Date.now() + ".log");
const csvFile = path.join(logDir, "env-connection-history.csv");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

console.log(chalk.blue.bold("\n🔍 Diagnóstico de entorno PostgreSQL"));

const env = process.env;
const logs = [];
const status = { user: false, password: false, host: false, db: false, connect: false };

// Detectar alias
const pgUser = env.PGUSER || env.DB_USER;
const pgPassword = env.PGPASSWORD || env.DB_PASS;
const pgHost = env.PGHOST || env.DB_HOST;
const pgDatabase = env.PGDATABASE || env.DB_NAME;
const databaseUrl = env.DATABASE_URL;

// Validar valores base
if (pgUser && typeof pgUser === "string") {
  status.user = true;
  logs.push("✅ Usuario definido: " + pgUser);
} else {
  logs.push("❌ Usuario (PGUSER/DB_USER) ausente o malformado");
}

if (pgPassword && typeof pgPassword === "string") {
  status.password = true;
  logs.push("✅ Contraseña definida");
} else {
  logs.push("❌ Contraseña (PGPASSWORD/DB_PASS) ausente o malformada");
}

if (pgHost && typeof pgHost === "string") {
  status.host = true;
  logs.push("✅ Host definido: " + pgHost);
} else {
  logs.push("❌ Host (PGHOST/DB_HOST) ausente o malformado");
}

if (pgDatabase && typeof pgDatabase === "string") {
  status.db = true;
  logs.push("✅ Base de datos definida: " + pgDatabase);
} else {
  logs.push("❌ Base de datos (PGDATABASE/DB_NAME) ausente o malformada");
}

// Prueba real de conexión
try {
  const client = new Client({ connectionString: databaseUrl });
  client.connect().then(() => {
    status.connect = true;
    logs.push("🟢 Conexión PostgreSQL exitosa ✔️");
    client.end();
    finalize();
  }).catch((err) => {
    logs.push("🔴 Fallo de conexión real: " + err.message);
    finalize();
  });
} catch (err) {
  logs.push("🔴 Error general: " + err.message);
  finalize();
}

function finalize() {
  const finalStatus = Object.values(status).every(Boolean);
  logs.push("\n📊 Estado final:");
  logs.push(finalStatus
    ? chalk.bgGreen.black("🟢 Entorno listo para seeds/migraciones")
    : chalk.bgRed.white("🔴 Entorno NO confiable para operaciones sensibles"));

  fs.writeFileSync(logFile, "📦 Verificación de entorno PostgreSQL - " + timestamp + "\n" + logs.join("\n"));

  const csvHeader = "timestamp,user_ok,pass_ok,host_ok,db_ok,connect_ok,status\n";
  const csvRow =
    timestamp + "," +
    status.user + "," +
    status.password + "," +
    status.host + "," +
    status.db + "," +
    status.connect + "," +
    finalStatus + "\n";

  if (!fs.existsSync(csvFile)) fs.writeFileSync(csvFile, csvHeader);
  fs.appendFileSync(csvFile, csvRow);

  console.log("\n" + logs.join("\n"));
}
