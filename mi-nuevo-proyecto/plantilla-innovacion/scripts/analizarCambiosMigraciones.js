const fs = require('fs');
const path = require('path');

function analizarCambiosMigraciones() {
  const migracionesDir = path.join(__dirname, '../migrations');
  const appliedMetaPath = path.join(__dirname, '../logs/applied-meta.json');

  let aplicadas = [];

  try {
    const contenido = fs.readFileSync(appliedMetaPath, 'utf8');
    aplicadas = JSON.parse(contenido);
  } catch {
    console.warn('⚠️ No se encontró applied-meta.json. Generalo con convertirMetaCSV.js.');
    return;
  }

  const archivos = fs.readdirSync(migracionesDir)
    .filter(f => f.endsWith('.js'))
    .sort();

  const pendientes = archivos.filter(f => !aplicadas.includes(f));
  if (!pendientes.length) {
    console.log('✅ Todas las migraciones han sido aplicadas. Nada pendiente.');
    return;
  }

  const criticos = ['password', 'email', 'userId', 'nombre', 'token'];
  const resumen = [];

  for (const file of pendientes) {
    const ruta = path.join(migracionesDir, file);
    const contenido = fs.readFileSync(ruta, 'utf8');

    const acciones = [];
    if (contenido.includes('addColumn')) acciones.push('addColumn');
    if (contenido.includes('removeColumn')) acciones.push('removeColumn');
    if (contenido.includes('createTable')) acciones.push('createTable');
    if (contenido.includes('dropTable')) acciones.push('dropTable');
    if (contenido.includes('renameColumn')) acciones.push('renameColumn');

    const targets = [...contenido.matchAll(/'(.*?)'/g)].map(m => m[1])
      .filter(val => val && !val.includes('.') && val.length <= 30);

    const camposCriticos = targets.filter(t => criticos.includes(t));

    const impactoCritico = camposCriticos.length ? '🚨 Sí: ' + camposCriticos.join(', ') : '—';

    resumen.push({
      archivo: file,
      acciones: acciones.join(', ') || '—',
      posiblesTablas: [...new Set(targets)].join(', ') || '—',
      impactoCritico
    });
  }

  // 🔍 Mostrar alerta destacada en consola
  console.table(resumen.map(r => ({
    archivo: r.archivo,
    acciones: r.acciones,
    posiblesTablas: r.posiblesTablas,
    impactoCritico: r.impactoCritico
  })));

  // 🧾 Exportar a CSV
  const csvPath = path.join(__dirname, `../logs/analisis-migraciones-impacto-${Date.now()}.csv`);
  const csv = [
    ['archivo', 'acciones', 'posiblesTablas', 'impactoCritico'],
    ...resumen.map(r => [r.archivo, r.acciones, r.posiblesTablas, `"${r.impactoCritico}"`])
  ].map(row => row.join(',')).join('\n');
  fs.writeFileSync(csvPath, csv);

  console.log(`📁 Exportación con análisis crítico en: ${csvPath}`);
}

analizarCambiosMigraciones();