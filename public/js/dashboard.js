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

  // Animación de KPIs + destello suave
  Anim.animateKPI("kpiVentasDia", data.dia.ventas);
  flashKPI("kpiVentasDia");

  Anim.animateKPI("kpiTransaccionesDia", data.dia.transacciones);
  flashKPI("kpiTransaccionesDia");

  Anim.animateKPI("kpiProductosDia", data.dia.productos_vendidos);
  flashKPI("kpiProductosDia");

  Anim.animateKPI("kpiTicketDia", data.dia.ticket_promedio);
  flashKPI("kpiTicketDia");

  // ============================
  // 3. ANIMACIÓN DE SECCIONES
  // ============================

  Anim.fadeIn("kpis-dia");
  Anim.fadeIn("ranking");
renderRanking(data.ranking.productos);
  Anim.fadeIn("alertas");
renderAlertas(data.alertas.lista || []);
  Anim.fadeIn("flujo");
}

cargarDashboard();
setInterval(cargarDashboard, 5000);


// ============================
// RANKING COCKPIT
// ============================

function renderRanking(lista) {
  const cont = document.getElementById("ranking");
  if (!cont) return;

  let html = "<h2>Ranking Productos</h2><ul class='ranking-list'>";

  lista.forEach((item, i) => {
    html += `
      <li class="ranking-item fade" id="rank-${i}">
        <span class="pos">${i + 1}</span>
        <span class="nombre">${item.Producto.nombre}</span>
        <span class="cantidad">${item.dataValues.total_vendido} uds</span>
      </li>
    `;
  });

  html += "</ul>";
  cont.innerHTML = html;

  // Fade-in suave
  lista.forEach((_, i) => {
    setTimeout(() => {
      document.getElementById(`rank-${i}`).classList.add("show");
    }, 80 * i);
  });
}


// ============================
// ALERTAS COCKPIT
// ============================

function renderAlertas(lista) {
  // Ordenar por prioridad antes de renderizar
  const prioridades = { vencimiento: 1, stock_bajo: 2, ventas_dia: 3, info: 4 };
  lista = lista.sort((a, b) => (prioridades[a.tipo] || 99) - (prioridades[b.tipo] || 99));
  const cont = document.getElementById("alertas");
  if (!cont) return;

  let html = "<h2>Alertas</h2><ul class='alerta-list'>";

  lista.forEach((a, i) => {
    const tipo = a.tipo || "info";

    const colores = {
      vencimiento: "var(--danger)",
      stock_bajo: "var(--warning)",
      ventas_dia: "var(--accent)",
      info: "var(--info)"
    };
      stock_bajo: "var(--warning)",
      vencimiento: "var(--danger)",
      ventas_dia: "var(--accent)",
      info: "var(--info)"
    };

    const iconos = {
      vencimiento: "⏳",
      stock_bajo: "⚠️",
      ventas_dia: "📊",
      info: "ℹ️"
    };
      stock_bajo: "⚠️",
      vencimiento: "⏳",
      ventas_dia: "📊",
      info: "ℹ️"
    };

    html += `
      <li class="alerta-item fade" id="alerta-${i}" style="border-left: 4px solid ${colores[tipo]};">
        <span class="icono">${iconos[tipo]}</span>
        <span class="mensaje">${a.mensaje}</span>
        <span class="fecha">${new Date(a.createdAt).toLocaleString()}</span>
      </li>
    `;
  });

  html += "</ul>";
  cont.innerHTML = html;

  // Fade-in suave
  lista.forEach((_, i) => {
    setTimeout(() => {
      document.getElementById(`alerta-${i}`).classList.add("show");
    }, 60 * i);
  });
}

