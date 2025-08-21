#!/usr/bin/env node
import { mkdirSync, copyFileSync, writeFileSync, readFileSync } from 'fs';

const src = './backend/audit/routes/';
const dest = './routes-site/';
mkdirSync(dest + 'assets', { recursive: true });

// Copiar artefactos técnicos
['routes-map.json', 'routes-status.json', 'routes-badge.svg'].forEach(file =>
  copyFileSync(src + file, dest + 'assets/' + file)
);

// Estilos cockpitizados
writeFileSync(dest + 'assets/style.css', `
body { font-family: sans-serif; background: #f4f4f4; margin: 0; padding: 2em; }
h1, h2 { color: #333; }
.container { max-width: 800px; margin: auto; background: #fff; padding: 2em; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
.badge { float: right; font-size: 1.5em; }
.route { border-left: 5px solid #ccc; padding: 1em; margin: 1em 0; background: #fafafa; }
.ok { border-color: #4CAF50; }
.err { border-color: #F44336; }
input { padding: 0.5em; width: 100%; margin-bottom: 1em; }
`);

// index.html
writeFileSync(dest + 'index.html', `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>📡 ComercialX Cockpit - Auditoría de Rutas</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="container">
    <h1>📡 ComercialX Cockpit</h1>
    <p>Micrositio técnico para auditoría visual y trazabilidad de rutas RESTful.</p>
    <ul>
      <li><a href="docs.html">📚 Documentación por Ruta</a></li>
      <li><a href="dashboard.html">📊 Dashboard de Métricas</a></li>
      <li><a href="monitor.html">🟢 Monitor en Tiempo Real</a></li>
    </ul>
    <img src="assets/routes-badge.svg" alt="Badge de cobertura">
  </div>
</body>
</html>
`);

// docs.html con buscador
writeFileSync(dest + 'docs.html', `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>📚 Documentación de Rutas</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="container">
    <h1>📚 Documentación Técnica de Rutas</h1>
    <input type="text" id="search" placeholder="🔍 Buscar endpoint...">
    <div id="routes"></div>
  </div>
  <script>
    let allRoutes = [];
    fetch('assets/routes-map.json')
      .then(res => res.json())
      .then(data => {
        allRoutes = data;
        render(data);
      });

    function render(data) {
      const container = document.getElementById('routes');
      container.innerHTML = '';
      data.forEach(r => {
        const div = document.createElement('div');
        div.className = 'route ' + (r.status === 'OK' ? 'ok' : 'err');
        div.innerHTML = \`
          <div class="badge">\${r.status === 'OK' ? '🟢' : '🔴'}</div>
          <h2>\${r.method} \${r.endpoint}</h2>
          <p><strong>Estado:</strong> \${r.status}</p>
          <p><strong>Timestamp:</strong> \${r.timestamp || 'N/A'}</p>
        \`;
        container.appendChild(div);
      });
    }

    document.getElementById('search').addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      const filtered = allRoutes.filter(r =>
        r.endpoint.toLowerCase().includes(q) ||
        r.method.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      );
      render(filtered);
    });
  </script>
</body>
</html>
`);

// dashboard.html
writeFileSync(dest + 'dashboard.html', `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>📊 Dashboard de Auditoría</title>
  <link rel="stylesheet" href="assets/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="container">
    <h1>📊 Dashboard de Auditoría</h1>
    <canvas id="chart"></canvas>
  </div>
  <script>
    fetch('assets/routes-map.json')
      .then(res => res.json())
      .then(data => {
        const ok = data.filter(r => r.status === 'OK').length;
        const err = data.filter(r => r.status === 'ERR').length;
        new Chart(document.getElementById('chart'), {
          type: 'doughnut',
          data: {
            labels: ['OK', 'ERR'],
            datasets: [{
              data: [ok, err],
              backgroundColor: ['#4CAF50', '#F44336']
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Cobertura de Rutas'
              }
            }
          }
        });
      });
  </script>
</body>
</html>
`);

// monitor.html
writeFileSync(dest + 'monitor.html', `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>🟢 Monitor en Tiempo Real</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="container">
    <h1>🟢 Monitor en Tiempo Real</h1>
    <div id="status" class="badge">⏳</div>
    <div id="info"></div>
  </div>
  <script>
    fetch('assets/routes-status.json')
      .then(res => res.json())
      .then(data => {
        const badge = data.status === 'green' ? '🟢' : data.status === 'yellow' ? '🟡' : '🔴';
        document.getElementById('status').textContent = badge;
        document.getElementById('info').innerHTML = \`
          <p><strong>Timestamp:</strong> \${data.timestamp}</p>
          <p><strong>Rutas OK:</strong> \${data.ok}</p>
          <p><strong>Rutas con error:</strong> \${data.err}</p>
          <p><strong>Cobertura:</strong> \${data.coverage}%</p>
        \`;
      });
  </script>
</body>
</html>
`);

console.log('🚀 Micrositio cockpitizado generado en routes-site/');
