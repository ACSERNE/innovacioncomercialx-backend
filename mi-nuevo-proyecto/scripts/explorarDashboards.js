const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

function explorarDashboards() {
  const logsDir = path.join(__dirname, '../logs');
  const archivos = fs.readdirSync(logsDir)
    .filter(file => file.startsWith('dashboard-ejecutores') && (file.endsWith('.html') || file.endsWith('.pdf')))
    .sort();

  if (archivos.length === 0) {
    console.log('⚠️ No se encontraron dashboards técnicos en la carpeta logs/.');
    return;
  }

  const listado = archivos.map(file => {
    const ruta = path.join(logsDir, file);
    const ext = path.extname(file).slice(1).toUpperCase();
    const fechaStr = file.split('-ejecutores-')[1]?.replace('.' + ext.toLowerCase(), '').replace(/-/g, ':');
    const fecha = new Date(fechaStr).toLocaleString('es-CL');

    return {
      nombre: file,
      fecha,
      tipo: ext,
      ruta
    };
  });

  console.table(listado);

  const parser = new Parser({ delimiter: ',' });
  const csv = parser.parse(listado);
  const exportPath = path.join(logsDir, `indice-dashboards-${Date.now()}.csv`);
  fs.writeFileSync(exportPath, csv);

  console.log(`📁 Índice exportado en: ${exportPath}`);
}

explorarDashboards();