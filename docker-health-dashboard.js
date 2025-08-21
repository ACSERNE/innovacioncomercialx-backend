// docker-health-dashboard.js
import { execSync } from 'child_process';
import fs from 'fs';

const IMAGE = 'comercialx-backend';
const TIMESTAMP = new Date().toISOString();
let markdown = `# 🐳 ComercialX - Docker Health Dashboard\n\n| Componente       | Estado        |\n|------------------|---------------|\n`;

try {
  const cid = execSync(`docker ps --filter "ancestor=${IMAGE}" --format "{{.ID}}"`).toString().trim();

  if (!cid) {
    markdown += `| Contenedor       | ❌ Inactivo   |\n`;
  } else {
    markdown += `| Contenedor       | ✅ Activo     |\n`;

    // HEALTHCHECK
    try {
      const health = execSync(`docker inspect --format='{{json .State.Health}}' ${cid}`).toString();
      markdown += `| Salud            | ✅ Detectado  |\n`;
    } catch {
      markdown += `| Salud            | ⚠️ No definido |\n`;
    }

    // Puertos
    const ports = execSync(`docker port ${cid}`).toString().trim();
    markdown += ports ? `| Puertos          | ✅ ${ports} |\n` : `| Puertos          | ⚠️ No expuestos |\n`;

    // Variables de entorno
    const env = execSync(`docker inspect --format='{{range .Config.Env}}{{println .}}{{end}}' ${cid}`).toString();
    const envVars = ['NODE_ENV', 'JWT_SECRET'].map(v => env.includes(v) ? `✅ ${v}` : `⚠️ ${v} faltante`).join(', ');
    markdown += `| Variables Entorno| ${envVars} |\n`;

    // Volúmenes
    const mounts = execSync(`docker inspect --format='{{range .Mounts}}{{println .Destination}}{{end}}' ${cid}`).toString().trim();
    markdown += mounts ? `| Volúmenes        | ✅ ${mounts.split('\n').join(', ')} |\n` : `| Volúmenes        | ⚠️ No montados |\n`;
  }

  markdown += `\n🕒 Timestamp: ${TIMESTAMP}\n✍️ *ComercialX Cockpit CLI*`;
  fs.writeFileSync('docker-health.md', markdown);
  console.log('📄 docker-health.md exportado correctamente');
} catch (err) {
  console.error('❌ Error al generar dashboard:', err.message);
}
