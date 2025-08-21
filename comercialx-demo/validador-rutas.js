const rutas = [
  { ruta: 'exports/onboarding/onboarding.log', tienda: 'hibrida' },
  { ruta: 'badge-deploy.svg', tienda: 'demo' },
  { ruta: 'data/inventario.json', tienda: 'online' },
  { ruta: 'data/flujo-caja.json', tienda: 'fisica' },
  { ruta: 'index.html', tienda: 'demo' }
];

const baseURL = 'https://acserne.github.io/comercialx-demo/';
const resultados = [];

async function validarRuta({ ruta, tienda }) {
  const url = baseURL + ruta;
  try {
    const res = await fetch(url);
    const estado = res.status === 200 ? '✅ OK' : '❌ Error';
    resultados.push({ ruta, estado, tienda, timestamp: new Date().toISOString() });
    generarBadge(ruta, estado);
  } catch (err) {
    resultados.push({ ruta, estado: '❌ Error', tienda, timestamp: new Date().toISOString() });
    generarBadge(ruta, '❌ Error');
  }
}

function generarBadge(ruta, estado) {
  const nombre = ruta.replace(/\W+/g, '-');
  const color = estado === '✅ OK' ? 'brightgreen' : 'red';
  const badge = `https://img.shields.io/badge/${nombre}-${encodeURIComponent(estado)}-${color}.svg`;
  console.log(`🛡️ Badge generado: ${badge}`);
}

function exportarCSV() {
  const encabezado = 'Ruta,Estado,Tienda,Timestamp\n';
  const filas = resultados.map(r => `${r.ruta},${r.estado},${r.tienda},${r.timestamp}`).join('\n');
  const csv = encabezado + filas;
  console.log('\n📤 CSV técnico:\n' + csv);
}

(async () => {
  for (const ruta of rutas) await validarRuta(ruta);
  exportarCSV();
})();
