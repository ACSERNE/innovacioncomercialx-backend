const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function generarDashboard() {
  const registros = await sequelize.query(
    `SELECT ejecutadoPor,
            COUNT(*) AS lotes,
            MAX("createdAt") AS ultima,
            MIN("createdAt") AS primera,
            (
              SELECT comentario FROM "SeedLogs"
              WHERE "ejecutadoPor" = s."ejecutadoPor"
              ORDER BY "createdAt" DESC LIMIT 1
            ) AS comentario
     FROM "SeedLogs" s
     GROUP BY ejecutadoPor
     ORDER BY lotes DESC`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const total = registros.reduce((a, r) => a + parseInt(r.lotes), 0);
  const labels = [];
  const dataBarras = [];
  const dataCircular = [];
  const tablaRows = [];

  for (const item of registros) {
    const fechas = await sequelize.query(
      `SELECT "createdAt" FROM "SeedLogs"
       WHERE "ejecutadoPor" = :ejecutor
       ORDER BY "createdAt" ASC`,
      {
        replacements: { ejecutor: item.ejecutadoPor },
        type: sequelize.QueryTypes.SELECT
      }
    );

    let promedio = '—';
    if (fechas.length > 1) {
      const difs = [];
      for (let i = 1; i < fechas.length; i++) {
        const prev = new Date(fechas[i - 1].createdAt);
        const curr = new Date(fechas[i].createdAt);
        difs.push((curr - prev) / (1000 * 60 * 60 * 24));
      }
      promedio = `${(difs.reduce((a, b) => a + b, 0) / difs.length).toFixed(2)} días`;
    }

    const ejecutor = item.ejecutadoPor || 'Sin registro';
    const porcentaje = ((item.lotes / total) * 100).toFixed(2);

    labels.push(ejecutor);
    dataBarras.push(item.lotes);
    dataCircular.push(porcentaje);

    tablaRows.push(`
      <tr>
        <td>${ejecutor}</td>
        <td>${item.lotes}</td>
        <td>${porcentaje}%</td>
        <td>${new Date(item.primera).toLocaleString('es-CL')}</td>
        <td>${new Date(item.ultima).toLocaleString('es-CL')}</td>
        <td>${item.comentario || 'Sin comentario'}</td>
        <td>${promedio}</td>
      </tr>
    `);
  }

  const html = `
  <html>
    <head>
      <title>Dashboard de Ejecutores</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body { font-family: Arial; margin: 2em; background: #f9f9f9; }
        table { border-collapse: collapse; width: 100%; background: #fff; margin-top: 2em; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        th { background: #007acc; color: white; }
        tr:nth-child(even) { background: #f2f2f2; }
        h2 { color: #333; }
      </style>
    </head>
    <body>
      <h2>📊 Dashboard de SeedLogs</h2>

      <canvas id="barChart" width="400" height="200"></canvas>
      <canvas id="pieChart" width="400" height="200" style="margin-top: 2em;"></canvas>

      <table>
        <tr>
          <th>Ejecutado por</th>
          <th>Lotes</th>
          <th>%</th>
          <th>Primera ejecución</th>
          <th>Última ejecución</th>
          <th>Comentario</th>
          <th>Promedio entre lotes</th>
        </tr>
        ${tablaRows.join('')}
      </table>

      <script>
        const ctxBar = document.getElementById('barChart').getContext('2d');
        const ctxPie = document.getElementById('pieChart').getContext('2d');

        new Chart(ctxBar, {
          type: 'bar',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: 'Lotes por ejecutor',
              data: ${JSON.stringify(dataBarras)},
              backgroundColor: 'rgba(0, 122, 204, 0.5)'
            }]
          }
        });

        new Chart(ctxPie, {
          type: 'pie',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: '% de ejecución',
              data: ${JSON.stringify(dataCircular)},
              backgroundColor: ${JSON.stringify(labels.map((_, i) => `hsl(${i * 45}, 70%, 60%)`))}
            }]
          }
        });
      </script>
    </body>
  </html>
  `;

  const fecha = new Date().toISOString().replace(/[:.]/g, '-');
  const ruta = path.join(__dirname, `../logs/dashboard-ejecutores-${fecha}.html`);
  fs.writeFileSync(ruta, html);
  console.log(`📄 HTML con gráficas exportado a: ${ruta}`);
}

generarDashboard();