let ultimoTotalAlertas = 0;
let ultimoStockCritico = 0;
let ultimaVenta = 0;

async function cargarDashboard() {
  const data = await API.getDashboard();

  // Alertas
  if (data.alertas.no_leidas > ultimoTotalAlertas) {
    Sounds.playAlert();
  }
  ultimoTotalAlertas = data.alertas.no_leidas;

  // Stock crítico
  if (data.stock_critico && data.stock_critico.length > ultimoStockCritico) {
    Sounds.playWarning();
  }
  ultimoStockCritico = data.stock_critico ? data.stock_critico.length : 0;

  // Venta nueva
  if (data.dia.transacciones > ultimaVenta) {
    Sounds.playSuccess();
  }
  ultimaVenta = data.dia.transacciones;

  // KPIs (igual que antes)
  document.getElementById('kpis-dia').innerHTML = `
    <h2>KPIs del Día</h2>
    <p>Ventas: \$${data.dia.ventas}</p>
    <p>Transacciones: ${data.dia.transacciones}</p>
    <p>Productos vendidos: ${data.dia.productos_vendidos}</p>
    <p>Ticket promedio: \$${data.dia.ticket_promedio.toFixed(2)}</p>
  `;

  // ... resto igual ...
}

cargarDashboard();
setInterval(cargarDashboard, 5000);
