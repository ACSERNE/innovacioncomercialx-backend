let ultimoTotalVentas = 0;
let ultimoStockCritico = 0;
let ultimoRanking = 0;
let ultimoAlertas = 0;

async function cargarTV() {
  const data = await API.getTV();

  // --- SONIDOS ---

  // Venta nueva
  if (data.ventas_dia.transacciones > ultimoTotalVentas) {
    Sounds.playSuccess();
  }
  ultimoTotalVentas = data.ventas_dia.transacciones;

  // Stock crítico
  if (data.stock_critico.length > ultimoStockCritico) {
    Sounds.playWarning();
  }
  ultimoStockCritico = data.stock_critico.length;

  // Ranking cambia (nuevo producto top)
  if (data.ranking_productos.length > ultimoRanking) {
    Sounds.playSuccess();
  }
  ultimoRanking = data.ranking_productos.length;

  // Alertas nuevas
  if (data.alertas.length > ultimoAlertas) {
    Sounds.playAlert();
  }
  ultimoAlertas = data.alertas.length;

  // --- RENDER TV MODE ---

  document.getElementById('ventas').innerHTML = `
    <h2>Ventas del Día</h2>
    <p>Total: \$${data.ventas_dia.total}</p>
    <p>Transacciones: ${data.ventas_dia.transacciones}</p>
    <p>Productos vendidos: ${data.ventas_dia.productos_vendidos}</p>
  `;

  document.getElementById('ultimas').innerHTML = `
    <h2>Últimas transacciones</h2>
    <ul>
      ${data.ultimas_transacciones.map(t => `
        <li>#${t.id} — \$${t.total} — ${new Date(t.createdAt).toLocaleTimeString()}</li>
      `).join('')}
    </ul>
  `;

  document.getElementById('ranking').innerHTML = `
    <h2>Top Productos</h2>
    <ul>
      ${data.ranking_productos.map(p => `
        <li>${p.Producto.nombre} — ${p.dataValues.total_vendido}</li>
      `).join('')}
    </ul>
  `;

  document.getElementById('stock').innerHTML = `
    <h2>Stock Crítico</h2>
    <ul>
      ${data.stock_critico.map(p => `
        <li>${p.nombre} — ${p.stock}</li>
      `).join('')}
    </ul>
  `;

  document.getElementById('alertas').innerHTML = `
    <h2>Alertas</h2>
    <ul>
      ${data.alertas.map(a => `
        <li>${a.mensaje}</li>
      `).join('')}
    </ul>
  `;

  document.getElementById('flujo').innerHTML = `
    <h2>Flujo de Caja</h2>
    <p>Ingresos: \$${data.flujo.ingresos}</p>
    <p>Egresos: \$${data.flujo.egresos}</p>
    <p>Balance: \$${data.flujo.balance}</p>
  `;
}

cargarTV();
setInterval(cargarTV, 3000);
