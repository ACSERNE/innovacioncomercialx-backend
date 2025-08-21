const fs = require('fs');
const https = require('https');

const artefactos = [
  'https://acserne.github.io/comercialx-demo/index.html',
  'https://acserne.github.io/comercialx-demo/dashboard/dashboard-summary.json',
  'https://acserne.github.io/comercialx-demo/badge-deploy.svg'
];

const resultados = [];

function verificar(url, callback) {
  https.get(url, res => {
    resultados.push({
      url,
      status: res.statusCode,
      ok: res.statusCode === 200
    });
    callback();
  }).on('error', () => {
    resultados.push({
      url,
      status: 'ERROR',
      ok: false
    });
    callback();
  });
}

function generarBadge(estado) {
  const color = estado === 'ONLINE' ? 'brightgreen' :
                estado === 'WARNING' ? 'yellow' : 'red';
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="130" height="20">
  <rect width="130" height="20" fill="${color}"/>
  <text x="65" y="14" fill="#fff" font-family="Verdana" font-size="12" text-anchor="middle">
    ${estado}
  </text>
</svg>`;
  fs.writeFileSync('despliegue.svg', svg);
}

function finalizar() {
  fs.writeFileSync('despliegue-status.json', JSON.stringify(resultados, null, 2));
  const errores = resultados.filter(r => !r.ok).length;
  const estado = errores === 0 ? 'ONLINE' :
                 errores < artefactos.length ? 'WARNING' : 'ERROR';
  generarBadge(estado);
  console.log(`✅ Verificación completa: ${estado}`);
}

(function ejecutar() {
  let pendientes = artefactos.length;
  artefactos.forEach(url => {
    verificar(url, () => {
      pendientes--;
      if (pendientes === 0) finalizar();
    });
  });
})();
