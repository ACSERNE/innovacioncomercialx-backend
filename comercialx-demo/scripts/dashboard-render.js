const fs = require('fs');
const path = require('path');

// Ruta del maestro
const maestroPath = path.join(__dirname, '../dashboard/dashboard-maestro.json');

// Función de validación básica
function validarMaestro(json) {
  const errores = [];
  if (!json.diagnostico_publicacion) {
    errores.push('Falta el bloque "diagnostico_publicacion".');
  } else {
    const pub = json.diagnostico_publicacion;
    if (!pub.status) errores.push('Falta "status" en diagnostico_publicacion.');
    if (!pub.badge) errores.push('Falta "badge" en diagnostico_publicacion.');
    if (!pub.csv) errores.push('Falta "csv" en diagnostico_publicacion.');
    if (!pub.log) errores.push('Falta "log" en diagnostico_publicacion.');
  }
  return errores;
}

// Carga y render
try {
  const raw = fs.readFileSync(maestroPath, 'utf8');
  const json = JSON.parse(raw);
  const errores = validarMaestro(json);

  if (errores.length > 0) {
    console.error('❌ Errores en dashboard-maestro.json:');
    errores.forEach(e => console.error('  -', e));
    fs.writeFileSync(path.join(__dirname, '../dashboard/maestro-errors.json'), JSON.stringify({ errores }, null, 2));
    process.exit(1);
  }

  console.log('✅ dashboard-maestro.json válido');
  console.log('📦 Estado:', json.diagnostico_publicacion.status);
  console.log('🎯 Badge:', json.diagnostico_publicacion.badge);
  console.log('📊 CSV:', json.diagnostico_publicacion.csv);
  console.log('📝 Log:', json.diagnostico_publicacion.log);

} catch (err) {
  console.error('💥 Error al procesar dashboard-maestro.json');
  console.error(err.message);
  process.exit(1);
}
