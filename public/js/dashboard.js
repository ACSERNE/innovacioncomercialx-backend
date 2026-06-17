async function cargarDashboard() {
  const data = await API.getDashboard();

  // KPIs
  document.getElementById('kpis-dia').innerHTML = `
    <h2>KPIs del Día</h2>
    <p>Ventas: \$${data.dia.ventas}</p>
    <p>Transacciones: ${data.dia.transacciones}</p>
    <p>Productos vendidos: ${data.dia.productos_vendidos}</p>
    <p>Ticket promedio: \$${data.dia.ticket_promedio.toFixed(2)}</p>
  `;

  document.getElementById('kpis-mes').innerHTML = `
    <h2>KPIs del Mes</h2>
    <p>Ventas: \$${data.mes.ventas}</p>
    <p>Transacciones: ${data.mes.transacciones}</p>
    <p>Productos vendidos: ${data.mes.productos_vendidos}</p>
    <p>Ticket promedio: \$${data.mes.ticket_promedio.toFixed(2)}</p>
  `;

  // Gráfico de ventas del mes (línea)
  const ctxVentas = document.getElementById('graficoVentas').getContext('2d');
  const ventasMensuales = [
    data.mes.ventas * 0.2,
    data.mes.ventas * 0.4,
    data.mes.ventas * 0.6,
    data.mes.ventas * 0.8,
    data.mes.ventas
  ];
  dibujarLinea(ctxVentas, ventasMensuales);

  // Gráfico productos más vendidos (barras)
  const ctxProductos = document.getElementById('graficoProductos').getContext('2d');
  const labels = data.ranking.productos.map(p => p.Producto.nombre);
  const valores = data.ranking.productos.map(p => p.dataValues.total_vendido);

  dibujarBarras(ctxProductos, labels, valores);
}

cargarDashboard();
setInterval(cargarDashboard, 5000);
