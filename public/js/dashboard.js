async function cargarDashboard() {
  const data = await API.getDashboard();

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

  document.getElementById('ranking').innerHTML = `
    <h2>Productos más vendidos</h2>
    <ul>
      ${data.ranking.productos.map(p => `
        <li>${p.Producto.nombre} — ${p.dataValues.total_vendido}</li>
      `).join('')}
    </ul>
  `;

  document.getElementById('flujo').innerHTML = `
    <h2>Flujo de Caja</h2>
    <p>Ingresos: \$${data.flujo.ingresos}</p>
    <p>Egresos: \$${data.flujo.egresos}</p>
    <p>Balance: \$${data.flujo.balance}</p>
  `;

  document.getElementById('alertas').innerHTML = `
    <h2>Alertas</h2>
    <p>No leídas: ${data.alertas.no_leidas}</p>
    <p>Total: ${data.alertas.total}</p>
  `;
}

cargarDashboard();
setInterval(cargarDashboard, 5000);
