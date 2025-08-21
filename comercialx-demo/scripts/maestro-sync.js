const fs = require('fs');
const path = require('path');

const maestroPath = path.join(__dirname, '../dashboard/dashboard-maestro.json');
const templatePath = path.join(__dirname, '../dashboard/dashboard-maestro-template.json');
const logPath = path.join(__dirname, '../dashboard/maestro-sync-log.json');
const badgePath = path.join(__dirname, '../dashboard/badges/maestro-sync.svg');

// Función recursiva para comparar objetos
function compararObjetos(template, actual, ruta = '') {
  const diferencias = [];

  for (const clave in template) {
    const nuevaRuta = ruta ? `${ruta}.${clave}` : clave;

    if (!(clave in actual)) {
      diferencias.push(`❌ Falta clave: ${nuevaRuta}`);
    } else if (typeof template[clave] === 'object' && template[clave] !== null) {
      diferencias.push(...compararObjetos(template[clave], actual[clave], nuevaRuta));
    }
  }

  return diferencias;
}

// Renderiza badge SVG simple
function renderizarBadge(status) {
  const color = status === 'OK' ? '#4caf50' : '#f44336';
  const texto = status === 'OK' ? 'SYNC OK' : 'SYNC FAIL';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
  <rect width="120" height="20" fill="${color}" rx="3" />
  <text x="60" y="14" fill="#fff" font-family="Verdana" font-size="12" text-anchor="middle">${texto}</text>
</svg>
`.trim();
}

// Ejecución principal
try {
  const maestro = JSON.parse(fs.readFileSync(maestroPath, 'utf8'));
  const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

  const diferencias = compararObjetos(template, maestro);
  const status = diferencias.length === 0 ? 'OK' : 'FAIL';

  fs.writeFileSync(logPath, JSON.stringify({ status, diferencias }, null, 2));
  fs.writeFileSync(badgePath, renderizarBadge(status));

  console.log(`🔍 Sincronización: ${status}`);
  if (status === 'FAIL') {
    console.log('📋 Diferencias detectadas:');
    diferencias.forEach(d => console.log('  -', d));
  } else {
    console.log('✅ dashboard-maestro.json está sincronizado con el template');
  }

} catch (err) {
  console.error('💥 Error al comparar maestro y template');
  console.error(err.message);
  process.exit(1);
}
