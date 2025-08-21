const fs = require('fs');
const path = require('path');

function asegurarDirectorio() {
  const exportDir = path.resolve('./exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
    console.log('\x1b[34m[INIT]\x1b[0m Carpeta ./exports creada');
  }
  return exportDir;
}

function exportToMarkdown(resultados, nombreArchivo) {
  if (!Array.isArray(resultados) || resultados.length === 0) {
    throw new Error('No hay resultados válidos para exportar a Markdown');
  }

  const exportDir = asegurarDirectorio();
  const lines = ['# Resultado de Validación', '', '| ID | Estado |', '|----|--------|'];
  resultados.forEach(r => lines.push(`| ${r.id} | ${r.estado} |`));

  const content = lines.join('\n');
  const outputPath = path.join(exportDir, nombreArchivo);
  fs.writeFileSync(outputPath, content);

  console.log(`\x1b[35m[MARKDOWN]\x1b[0m Exportado → ${outputPath}`);
  return outputPath;
}

function exportToCSV(resultados, nombreArchivo) {
  if (!Array.isArray(resultados) || resultados.length === 0) {
    throw new Error('No hay resultados válidos para exportar a CSV');
  }

  const exportDir = asegurarDirectorio();
  const lines = ['id,estado'];
  resultados.forEach(r => lines.push(`${r.id},${r.estado}`));

  const content = lines.join('\n');
  const outputPath = path.join(exportDir, nombreArchivo);
  fs.writeFileSync(outputPath, content);

  console.log(`\x1b[36m[CSV]\x1b[0m Exportado → ${outputPath}`);
  return outputPath;
}

function mostrarSemaforo(resultados) {
  const total = resultados.length;
  const validos = resultados.filter(r => r.estado.includes('válido')).length;
  const porcentaje = (validos / total) * 100;

  let color = '\x1b[31m'; // 🔴 rojo
  let icono = '🔴';
  if (porcentaje >= 75) { color = '\x1b[32m'; icono = '🟢'; }
  else if (porcentaje >= 40) { color = '\x1b[33m'; icono = '🟡'; }

  console.log(`\n${color}[SEMÁFORO]\x1b[0m ${icono} ${porcentaje.toFixed(1)}% válidos (${validos}/${total})`);
}

function mostrarTablaResumen(resultados) {
  console.log('\n\x1b[4mResumen de Validación:\x1b[0m');
  console.log('┌─────────────┬─────────────┐');
  console.log('│     ID      │   Estado    │');
  console.log('├─────────────┼─────────────┤');

  resultados.forEach(r => {
    const id = String(r.id).padEnd(11, ' ');
    const estado = r.estado.padEnd(11, ' ');
    console.log(`│ ${id} │ ${estado} │`);
  });

  console.log('└─────────────┴─────────────┘');
}

module.exports = {
  exportToMarkdown,
  exportToCSV,
  mostrarSemaforo,
  mostrarTablaResumen
};