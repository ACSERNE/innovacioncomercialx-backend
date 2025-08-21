const fs = require('fs');
const path = require('path');

const logPath = path.resolve('./cockpit/logs/actions-log.csv');
const exportPath = path.resolve('./cockpit/dashboard.md');

if (!fs.existsSync(logPath)) {
  console.error('❌ No se encontró actions-log.csv');
  process.exit(1);
}

const raw = fs.readFileSync(logPath, 'utf8').trim().split('\n').slice(1); // omitir encabezado

const registros = raw
  .map(line => {
    const parts = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    if (parts.length < 4) return null;
    const [timestamp, email, role, action] = parts;
    return {
      timestamp: timestamp.trim(),
      email: email.trim(),
      role: role.trim(),
      action: action ? action.replace(/(^"|"$)/g, '').trim() : '[Sin acción]'
    };
  })
  .filter(Boolean);

console.log('\n📊 Dashboard CLI — Últimas acciones cockpitizadas\n');

const agrupado = {};
registros.forEach(r => {
  const key = `${r.email} (${r.role})`;
  if (!agrupado[key]) agrupado[key] = [];
  agrupado[key].push(r);
});

Object.entries(agrupado).forEach(([usuario, acciones]) => {
  console.log(`\n🧑‍💻 ${usuario}`);
  acciones.slice(-5).forEach(r => {
    const icono = r.action.includes('Eliminar') ? '🧹' :
                  r.action.includes('Actualizar') ? '📝' :
                  r.action.includes('Acceso') ? '📂' :
                  r.action.includes('Salida') ? '🚪' :
                  r.action.includes('Verificación') ? '🔍' :
                  r.action.includes('Exportar') ? '📤' :
                  '🔧';
    console.log(`  ${icono} ${r.timestamp} — ${r.action}`);
  });
});

const markdown = ['# 📊 Dashboard CLI — Últimas acciones cockpitizadas\n'];
Object.entries(agrupado).forEach(([usuario, acciones]) => {
  markdown.push(`\n## 🧑‍💻 ${usuario}`);
  acciones.slice(-5).forEach(r => {
    markdown.push(`- ${r.timestamp} — ${r.action}`);
  });
});
fs.writeFileSync(exportPath, markdown.join('\n'));
console.log('\n✅ Exportado a cockpit/dashboard.md');
