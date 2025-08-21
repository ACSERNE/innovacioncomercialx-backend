// health-summary.js
import { execSync } from 'child_process';
import fs from 'fs';
import https from 'https';
import http from 'http';

const TIMESTAMP = new Date().toISOString();
const REMOTE_URL = process.env.REMOTE_URL || 'http://localhost:3000';
const JWT = process.env.JWT_TOKEN || '';
let markdown = `# 🧩 ComercialX - Health Summary\n\n| Entorno     | Estado  | Detalle |\n|-------------|---------|---------|\n`;

function badge(state) {
  return state === 'ok' ? '🟢 OK' : state === 'warn' ? '🟡 Advertencia' : '🔴 Error';
}

// 🔍 Local
try {
  const res = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3000').toString().trim();
  markdown += `| Localhost    | ${badge(res === '200' ? 'ok' : 'warn')} | HTTP ${res} |\n`;
} catch {
  markdown += `| Localhost    | ${badge('error')} | Sin respuesta |\n`;
}

// 🐳 Docker
try {
  const cid = execSync('docker ps --filter "ancestor=comercialx-backend" --format "{{.ID}}"').toString().trim();
  if (!cid) {
    markdown += `| Docker       | ${badge('error')} | Contenedor inactivo |\n`;
  } else {
    const health = execSync(`docker inspect --format='{{json .State.Health.Status}}' ${cid}`).toString().replace(/"/g, '');
    markdown += `| Docker       | ${badge(health === 'healthy' ? 'ok' : 'warn')} | ${health} |\n`;
  }
} catch {
  markdown += `| Docker       | ${badge('error')} | Error al inspeccionar |\n`;
}

// 🌐 Remoto
function checkRemote(url, token) {
  const client = url.startsWith('https') ? https : http;
  const options = {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  };

  const req = client.request(url, options, res => {
    const status = res.statusCode;
    markdown += `| Remoto       | ${badge(status === 200 ? 'ok' : 'warn')} | HTTP ${status} |\n`;
    markdown += `\n🕒 Timestamp: ${TIMESTAMP}\n✍️ *ComercialX Cockpit CLI*`;
    fs.writeFileSync('health-summary.md', markdown);
    console.log('📄 health-summary.md exportado correctamente');
  });

  req.on('error', () => {
    markdown += `| Remoto       | ${badge('error')} | Sin respuesta |\n`;
    markdown += `\n🕒 Timestamp: ${TIMESTAMP}\n✍️ *ComercialX Cockpit CLI*`;
    fs.writeFileSync('health-summary.md', markdown);
    console.log('📄 health-summary.md exportado con error remoto');
  });

  req.end();
}

checkRemote(REMOTE_URL, JWT);
