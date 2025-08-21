const rutas = [
  { url: '../index.html', tienda: 'demo' },
  { url: '../exports/onboarding/onboarding.log', tienda: 'hibrida' },
  { url: '../data/inventario.json', tienda: 'online' },
  { url: '../data/flujo-caja.json', tienda: 'fisica' },
  { url: '../badge-deploy.svg', tienda: 'demo' }
];

const resultados = {};
rutas.forEach(r => {
  fetch(r.url, { method: 'HEAD' })
    .then(res => {
      const estado = res.status;
      const ok = estado === 200 ? '✅ OK' : '❌ Error';
      const log = {
        ruta: r.url,
        estado,
        detalles: ok,
        timestamp: new Date().toISOString()
      };
      if (!resultados[r.tienda]) resultados[r.tienda] = [];
      resultados[r.tienda].push(log);
    })
    .catch(() => {
      const log = {
        ruta: r.url,
        estado: 'N/A',
        detalles: '⚠️ Inválido',
        timestamp: new Date().toISOString()
      };
      if (!resultados[r.tienda]) resultados[r.tienda] = [];
      resultados[r.tienda].push(log);
    });
});

function exportarJSON(tienda) {
  const logs = resultados[tienda] || [];
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `logs-${tienda}.json`;
  a.click();
}
