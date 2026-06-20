async function cargarAlertas() {
  const alertas = await API.getAlertas();

  document.getElementById('alertas').innerHTML = `
    <ul>
      ${alertas.map(a => `
        <li>
          ${a.mensaje}
          <button onclick="marcar(${a.id})">Marcar leída</button>
        </li>
      `).join('')}
    </ul>
  `;
}

async function marcar(id) {
  await API.marcarAlertaLeida(id);
  cargarAlertas();
}

cargarAlertas();
setInterval(cargarAlertas, 5000);
