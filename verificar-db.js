async function main() {
// verificar-db.js
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const exportCSV = args.includes("--csv");
const exportJSON = args.includes("--json");

const timestamp = new Date().toISOString();
const output = {
  estado: "pendiente",
  hora: timestamp,
  host: "",
  base_de_datos: "",
  usuario: "",
  mensaje: "",
  stack: "",
};

// Autodetección de entorno
const defaultHost = process.env.PGHOST || (
  process.env.IN_DOCKER === "true" ? "postgres" : "localhost"
);

const client = new Client({
  host: defaultHost,
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "postgres",
});

(async () => {
  console.log(`# 🧪 Diagnóstico de conexión PostgreSQL\n`);

  try {
    await client.connect();
    const res = await client.query("SELECT NOW() AS tiempo_actual");

    output.estado = "exitoso";
    output.hora = res.rows[0].tiempo_actual;
    output.host = client.host;
    output.base_de_datos = client.database;
    output.usuario = client.user;

    console.log(`✅ Conexión exitosa`);
    console.log(`\n**Hora del servidor:** ${output.hora}`);
    console.log(`\n**Host:** ${output.host}`);
    console.log(`**Base de datos:** ${output.base_de_datos}`);
    console.log(`**Usuario:** ${output.usuario}`);

    await client.end();
  } catch (err) {
    output.estado = "fallido";
    output.mensaje = err.message;
    output.stack = err.stack;

    console.log(`❌ Error de conexión\n`);
    console.log(`**Mensaje:** ${err.message}`);
    console.log(`\n**Stack:**\n\`\`\`\n${err.stack}\n\`\`\``);
    process.exitCode = 1;
  }

  // Exportación CSV
  if (exportCSV) {
    const csv = [
      "estado,hora,host,base_de_datos,usuario,mensaje",
      `"${output.estado}","${output.hora}","${output.host}","${output.base_de_datos}","${output.usuario}","${output.mensaje}"`
    ].join("\n");

    fs.writeFileSync(path.resolve("/app", "diagnostico-postgres.csv"), csv);
  }

  // Exportación JSON
  if (exportJSON) {
    fs.writeFileSync(path.resolve("/app", "diagnostico-postgres.json"), JSON.stringify(output, null, 2));
  }
})();}
main()
