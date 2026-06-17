let ultimoTotalAlertas = 0;
let ultimoStockCritico = 0;
let ultimaVenta = 0;

async function cargarDashboard() {
  const data = await API.getDashboard();

  // ============================
  // 1. SONIDOS
  // ============================

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

  // ============================
  // 2. KPIs DEL DÍA (con animación)
  // ============================

  document.getElementById('kpis-dia').innerHTML = `
    <h2>KPIs del Día</h2>
    <p id="kpiVentasDia">Ventas: \$${data.dia.ventas}</p>
    <p id="kpiTransaccionesDia">Transacciones: ${data.dia.transacciones}</p>
    <p id="kpiProductosDia">Productos vendidos: ${data.dia.productos_vendidos}</p>
    <p id="kpiTicketDia">Ticket promedio: \$${data.dia.ticket_promedio.toFixed(2)}</p>
  `;

  // Animación de KPIs
  Anim.animateKPI("kpiVentasDia", data.dia.ventas);
  Anim.animateKPI("kpiTransaccionesDia", data.dia.transacciones);
  Anim.animateKPI("kpiProductosDia", data.dia.productos_vendidos);
  Anim.animateKPI("kpiTicketDia", data.dia.ticket_promedio);

  // ============================
  // 3. ANIMACIÓN DE SECCIONES
  // ============================

  Anim.fadeIn("kpis-dia");
  Anim.fadeIn("ranking");
  Anim.fadeIn("alertas");
  Anim.fadeIn("flujo");
}

cargarDashboard();
setInterval(cargarDashboard, 5000);

