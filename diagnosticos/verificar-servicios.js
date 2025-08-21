const fs = require('fs');
const { Client } = require('pg');
const redis = require('redis');
const http = require('http');
const path = require('path');

const resultados = [];

function registrar(nombre, estado, mensaje, sugerencia) {
  resultados.push({ nombre, estado, mensaje, sugerencia });
}

async function verificarPostgres() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: 5432,
  });

  try {
    await client.connect();
    registrar('PostgreSQL', '✅ OK', 'Conexión exitosa', '');
    await client.end();
  } catch (err) {
    registrar('PostgreSQL', '❌ Fallo', err.message, 'Verifica credenciales y si el host es accesible desde el contenedor');
  }
}

async function verificarRedis() {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: 6379,
    },
  });

  try {
    await client.connect();
    registrar('Redis', '✅ OK', 'Conexión exitosa', '');
    await client.quit();
  } catch (err) {
    registrar('Redis', '❌ Fallo', err.message, 'Verifica si el host "redis" existe o usa IP directa');
  }
}

function verificarAPI() {
  const host = process.env.API_HOST || 'localhost';
  const port = process.env.API_PORT || 3000;

  return new Promise((resolve) => {
    http.get({ host, port, timeout: 3000 }, (res) => {
      registrar('API HTTP', '✅ OK', `Código ${res.statusCode}`, '');
      resolve();
    }).on('error', (err) => {
      registrar('API HTTP', '❌ Fallo', err.message, 'Verifica si la API está corriendo y accesible desde el contenedor');
      resolve();
    });
  });
}

function exportarMarkdown() {
  const md = ['# 🧪 Diagnóstico de Servicios\n'];
  resultados.forEach(r => {
    md.push(`- **${r.nombre}**: ${r.estado} → ${r.mensaje}`);
    if (r.sugerencia) md.push(`  - 💡 Sugerencia: ${r.sugerencia}`);
  });
  fs.writeFileSync(path.join(__dirname, '../reportes/diagnostico-servicios.md'), md.join('\n'), 'utf8');
}

function exportarCSV() {
  const csv = ['Servicio,Estado,Mensaje,Sugerencia'];
  resultados.forEach(r => {
    csv.push(`"${r.nombre}","${r.estado}","${r.mensaje}","${r.sugerencia}"`);
  });
  fs.writeFileSync(path.join(__dirname, '../reportes/diagnostico-servicios.csv'), csv.join('\n'), 'utf8');
}

(async () => {
  await verificarPostgres();
  await verificarRedis();
  await verificarAPI();
  exportarMarkdown();
  exportarCSV();
  console.log('✅ Diagnóstico completado. Reportes generados en /app/reportes/');
})();
