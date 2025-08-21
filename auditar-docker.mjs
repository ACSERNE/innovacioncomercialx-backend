import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

let estado = 'pendiente';
let contenedores = [];
let timestamp = new Date().toISOString();

try {
  const raw = execSync('docker ps --format "{{json .}}"').toString().trim().split('\n');
  contenedores = raw.map(line => JSON.parse(line));
  estado = contenedores.length > 0 ? 'validado' : 'pendiente';
} catch (err) {
  estado = 'error';
}

const log = {
  modulo: 'docker',
  estado,
  timestamp,
  contenedores
};

writeFileSync('routes-site/docker-log.json', JSON.stringify(log, null, 2));
writeFileSync('routes-site/docker-log.md', `# Auditoría Docker\n\n**Estado:** ${estado}\n**Timestamp:** ${timestamp}\n\n## Contenedores\n${contenedores.map(c => `- ${c.Names} (${c.Status})`).join('\n')}`);

const badge = `
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
  <rect width="120" height="20" fill="#555"/>
  <rect x="60" width="60" height="20" fill="${estado === 'validado' ? '#4caf50' : estado === 'pendiente' ? '#f39c12' : '#e74c3c'}"/>
  <text x="30" y="14" fill="#fff" font-family="Verdana" font-size="11">docker</text>
  <text x="90" y="14" fill="#fff" font-family="Verdana" font-size="11">${estado}</text>
</svg>
`;

writeFileSync('routes-site/badge-docker.svg', badge.trim());

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>🐳 ComercialX Cockpit - Auditoría de Docker</title>
  <style>
    body { font-family: sans-serif; background: #f4f4f4; padding: 2em; }
    .badge { margin: 1em 0; }
    .log { background: #fff; padding: 1em; border-radius: 8px; box-shadow: 0 0 5px #ccc; }
    h1 { color: #333; }
    pre { white-space: pre-wrap; word-break: break-word; }
  </style>
</head>
<body>
  <h1>🐳 ComercialX Cockpit - Auditoría de Docker</h1>
  <div class="badge">
    <img src="badge-docker.svg" alt="Badge docker">
  </div>
  <div class="log">
    <h2>🧾 Estado técnico</h2>
    <pre>
Módulo: docker
Estado: ${estado}
Timestamp: ${timestamp}
Exportado desde JSON cockpitizado
    </pre>
  </div>
  <p><em>Este micrositio se genera automáticamente desde scripts cockpitizados.</em></p>
</body>
</html>
`;

writeFileSync('routes-site/docker.html', html.trim());
