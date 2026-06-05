const TOKEN = localStorage.getItem("token"); // Ajusta según tu login

async function cargarDashboard() {
  const res = await fetch("/api/dashboard", {
    headers: { "Authorization": "Bearer " + TOKEN }
  });

  const data = await res.json();
  console.log("Dashboard:", data);

  // ============================
  // KPIs
  // ============================
  document.getElementById("kpiVentas").innerText = "$" + data.kpis.totalVentas;
  document.getElementById("kpiCompras").innerText = "$" + data.kpis.totalCompras;
  document.getElementById("kpiBalance").innerText = "$" + data.kpis.balance;
  document.getElementById("kpiTicket").innerText = "$" + data.kpis.ticketPromedio;

  // ============================
  // Ranking productos
  // ============================
  const tablaProd = document.getElementById("tablaProductos");
  tablaProd.innerHTML = "<tr><th>Producto</th><th>Cantidad</th></tr>";

  Object.entries(data.rankingProductos).forEach(([nombre, cantidad]) => {
    tablaProd.innerHTML += `<tr><td>${nombre}</td><td>${cantidad}</td></tr>`;
  });

  // ============================
  // Inventario crítico
  // ============================
  const tablaStock = document.getElementById("tablaStock");
  tablaStock.innerHTML = "<tr><th>Producto</th><th>Stock</th></tr>";

  data.inventario.productosBajoStock.forEach(p => {
    tablaStock.innerHTML += `<tr><td>${p.nombre}</td><td>${p.stock}</td></tr>`;
  });

  // ============================
  // Alertas
  // ============================
  const alertasDiv = document.getElementById("alertas");
  alertasDiv.innerHTML = "";

  data.alertas.forEach(a => {
    alertasDiv.innerHTML += `
      <div class="alerta">
        <strong>${a.tipo}</strong>: ${a.mensaje}
      </div>
    `;
  });

  // ============================
  // Gráfico ventas por hora
  // ============================
  const horas = Object.keys(data.ventasPorHora);
  const montos = Object.values(data.ventasPorHora);

  new Chart(document.getElementById("chartHoras"), {
    type: "bar",
    data: {
      labels: horas,
      datasets: [{
        label: "Ventas por hora",
        data: montos,
        backgroundColor: "#58a6ff"
      }]
    }
  });

  // ============================
  // Gráfico ventas últimos 7 días
  // ============================
  const fechas = data.ventas7dias.map(v => v.fecha);
  const totales = data.ventas7dias.map(v => Number(v.total));

  new Chart(document.getElementById("chart7dias"), {
    type: "line",
    data: {
      labels: fechas,
      datasets: [{
        label: "Ventas últimos 7 días",
        data: totales,
        borderColor: "#2ea043",
        backgroundColor: "rgba(46,160,67,0.3)"
      }]
    }
  });
}

// Cargar al inicio
cargarDashboard();

// Auto-refresh cada 30 segundos
setInterval(cargarDashboard, 30000);
