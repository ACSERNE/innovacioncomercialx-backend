const fs = require('fs');
const path = require('path');

const carpetas = ['controllers', 'models', 'routes', 'scripts', 'src', 'utils'];
const archivos = ['index.js', 'package.json', 'README.md', 'server.js'];
const timestamp = new Date().toISOString();
const mdPath = path.resolve('./cockpit/rutas.md');

let markdown = `# 📁 Verificación de Rutas — Innovación ComercialX\n\n`;
markdown += `🕒 Fecha: ${timestamp}\n\n`;
markdown += `## 📂 Carpetas críticas\n\n`;

carpetas.forEach(dir => {
  const exists = fs.existsSync(path.resolve(dir));
  markdown += exists
    ? `- ✅ \`${dir}/\` encontrada\n`
    : `- ❌ \`${dir}/\` faltante\n`;
});

markdown += `\n## 📄 Archivos esenciales\n\n`;

archivos.forEach(file => {
  const exists = fs.existsSync(path.resolve(file));
  markdown += exists
    ? `- ✅ \`${file}\` encontrado\n`
    : `- ❌ \`${file}\` faltante\n`;
});

markdown += `\n---\n📝 Generado automáticamente por \`generar-rutas-md.js\` para trazabilidad cockpitizada.\n`;

const dir = path.dirname(mdPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(mdPath, markdown);

console.log('✅ Reporte generado en cockpit/rutas.md');
