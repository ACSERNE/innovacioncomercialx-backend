const fs = require('fs');
const path = require('path');

const summaryPath = path.join(__dirname, '../dashboard/dashboard-summary.json');

function cargarJSON(ruta) {
  try {
    return JSON.parse(fs.readFileSync(ruta, 'utf8'));
  } catch {
    return { status: 'ERROR', motivo: `No se pudo cargar ${ruta}` };
  }
}

const summary = {
  timestamp: new Date().toISOString(),
  render: cargarJSON(path.join(__dirname, '../publish-debug.json')),
  sync: cargarJSON(path.join(__dirname, '../dashboard/maestro-sync-log.json')),
  reset: cargarJSON(path.join(__dirname, '../dashboard/maestro-reset-log.json')),
  publish: cargarJSON(path.join(__dirname, '../publish-status.json'))
};

fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log('📦 dashboard-summary.json generado correctamente');
