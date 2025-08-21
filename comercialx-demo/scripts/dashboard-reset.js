const fs = require('fs');
const path = require('path');

const maestroPath = path.join(__dirname, '../dashboard/dashboard-maestro.json');
const templatePath = path.join(__dirname, '../dashboard/dashboard-maestro-template.json');
const logPath = path.join(__dirname, '../dashboard/maestro-reset-log.json');
const badgePath = path.join(__dirname, '../dashboard/badges/maestro-reset.svg');

function esIncompleto(json) {
  return !json.validacion_remota || !json.artefactos;
}

function renderizarBadge(status) {
  const color = status === 'RESET OK' ? '#2196f3' : '#9e9e9e';
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="20">
  <rect width="160" height="20" fill="${color}" rx="3" />
  <text x="80" y="14" fill="#fff" font-family="Verdana" font-size="12" text-anchor="middle">${status}</text>
</svg>
`.trim();
}

try {
  const maestroRaw = fs.readFileSync(maestroPath, 'utf8');
  const maestro = JSON.parse(maestroRaw);

  if (esIncompleto(maestro)) {
    const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
    fs.writeFileSync(maestroPath, JSON.stringify(template, null, 2));
    fs.writeFileSync(logPath, JSON.stringify({ status: 'RESET OK', motivo: 'Maestro incompleto, restaurado desde template' }, null, 2));
    fs.writeFileSync(badgePath, renderizarBadge('RESET OK'));
    console.log('🔁 Maestro restaurado desde template');
  } else {
    fs.writeFileSync(logPath, JSON.stringify({ status: 'SKIPPED', motivo: 'Maestro ya contiene claves completas' }, null, 2));
    fs.writeFileSync(badgePath, renderizarBadge('SKIPPED'));
    console.log('✅ Maestro completo, no se requiere restauración');
  }

} catch (err) {
  console.error('💥 Error al verificar o restaurar el maestro');
  console.error(err.message);
  process.exit(1);
}
