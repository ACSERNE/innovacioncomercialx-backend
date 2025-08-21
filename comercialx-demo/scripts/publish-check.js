const fs = require('fs');
const path = require('path');

const paises = ['Chile', 'Mexico', 'España'];
const basePath = path.join(__dirname, '../dashboard');
const statusLog = path.join(basePath, '../publish-status.json');
const badgePath = path.join(basePath, 'badges/publish-status.svg');

function verificarArtefactos(pais) {
  const artefactos = [
    `val-${pais.toLowerCase()}.csv`,
    `val-${pais.toLowerCase()}-log.json`,
    `badges/val-${pais.toLowerCase()}.svg`
  ];
  const faltantes = artefactos.filter(file => !fs.existsSync(path.join(basePath, '..', file)));
  return {
    pais,
    status: faltantes.length === 0 ? 'OK' : 'FAIL',
    faltantes
  };
}

function renderizarBadge(status) {
  const color = status === 'OK' ? '#4caf50' : '#f44336';
  const texto = status === 'OK' ? 'PUBLICACIÓN OK' : 'PUBLICACIÓN FAIL';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="20">
  <rect width="160" height="20" fill="${color}" rx="3" />
  <text x="80" y="14" fill="#fff" font-family="Verdana" font-size="12" text-anchor="middle">${texto}</text>
</svg>
`.trim();
}

const resultados = paises.map(verificarArtefactos);
const statusGlobal = resultados.every(r => r.status === 'OK') ? 'OK' : 'FAIL';

fs.writeFileSync(statusLog, JSON.stringify({ status: statusGlobal, resultados }, null, 2));
fs.writeFileSync(badgePath, renderizarBadge(statusGlobal));

console.log(`📦 Estado global de publicación: ${statusGlobal}`);
resultados.forEach(r => {
  console.log(`  - ${r.pais}: ${r.status}`);
  if (r.faltantes.length > 0) {
    r.faltantes.forEach(f => console.log(`    ⚠️ Falta: ${f}`));
  }
});
