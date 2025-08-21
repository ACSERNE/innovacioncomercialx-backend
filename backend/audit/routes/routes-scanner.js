// ComercialX Cockpit - routes-scanner.js
// Escanea rutas en controllers/ y exporta routes-map.md

const fs = require('fs');
const path = require('path');

const CONTROLLERS_DIR = path.join(__dirname, '../../controllers');
const OUTPUT_FILE = path.join(__dirname, 'routes-map.md');
const ROUTE_REGEX = /(app|router)\\.(get|post|put|delete|patch)\\s*\\(\\s*['"\`"]([^'"\`"]+)['"\`"]/g;

let routes = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = ROUTE_REGEX.exec(content)) !== null) {
    routes.push({
      method: match[2].toUpperCase(),
      path: match[3],
      source: path.relative(CONTROLLERS_DIR, filePath)
    });
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.js')) {
      scanFile(fullPath);
    }
  });
}

function generateMarkdown() {
  const timestamp = new Date().toISOString();
  const header = \`# 🧭 ComercialX - Mapa de Rutas Activas

| Método | Ruta | Archivo fuente |
|--------|------|----------------|\n\`;
  const rows = routes.map(r => \`| \${r.method} | \${r.path} | \${r.source} |\`).join('\\n');
  const footer = \`\\n\\n🕒 Generado: \${timestamp}
✍️ *ComercialX Cockpit CLI*\`;
  return header + rows + footer;
}

// Ejecutar
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
walk(CONTROLLERS_DIR);
fs.writeFileSync(OUTPUT_FILE, generateMarkdown());

console.log(\`✅ Mapa de rutas generado en: \${OUTPUT_FILE}\`);
