const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const redis = require("redis");
const http = require("http");

const args = process.argv.slice(2);
const exportCSV = args.includes("--csv");
const exportJSON = args.includes("--json");

const timestamp = new Date().toISOString();
const resultados = [];

console.log(`# 🧪 Diagnóstico de conectividad\n`);

async function verificarPostgres() {
  const client = new Client({
    host: process.env.PGHOST || "postgres",
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: process.env.PGDATABASE || "postgres",
  });

  try {
    await client.connect();
    resultados.push({ servicio: "PostgreSQL", estado: "✅ Conectado", detalle: `Host: ${client.host}` });
    await client.end();
  } catch (err) {
    resultados.push({ servicio: "PostgreSQL", estado: "❌ Fallo", detalle: err.message });
  }
}

async function verificarRedis() {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || "redis",
      port: process.env.REDIS_PORT || 6379,
    }
  });

  try {
    await client.connect();
    resultados.push({ servicio: "Redis", estado: "✅ Conectado", detalle: `Host: ${client.options.socket.host}` });
    await client.quit();
  } catch (err) {
    resultados.push({ servicio: "Redis", estado: "❌ Fallo", detalle: err.message });
  }
}

function verificarHTTP() {
  return new Promise((resolve) => {
    const url = process.env.API_URL || "http://localhost:3000/health";
    http.get(url, (res) => {
      resultados.push({ servicio: "API HTTP", estado: "✅ Respuesta", detalle: `Status: ${res.statusCode}` });
      resolve();
    }).on("error", (err) => {
      resultados.push({ servicio: "API HTTP", estado: "❌ Fallo", detalle: err.message });
      resolve();
    });
  });
}

(async () => {
  await verificarPostgres();
  await verificarRedis();
  await verificarHTTP();

  resultados.forEach(r => {
    console.log(`- **${r.servicio}**: ${r.estado} → ${r.detalle}`);
  });

  if (exportCSV) {
    const csv = ["servicio,estado,detalle"].concat(
      resultados.map(r => `"${r.servicio}","${r.estado}","${r.detalle}"`)
    ).join("\n");

    fs.writeFileSync(path.resolve("/app", "diagnostico-verificar-conectividad.csv"), csv);
  }

  if (exportJSON) {
    const json = {
      hora: timestamp,
      servicios: resultados
    };

    fs.writeFileSync(path.resolve("/app", "diagnostico-verificar-conectividad.json"), JSON.stringify(json, null, 2));
  }
})();
