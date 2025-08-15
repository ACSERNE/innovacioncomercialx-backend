fetch('routes-site.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cockpit');
    data.modulos.forEach(mod => {
      const div = document.createElement('div');
      div.className = 'modulo';
      div.innerHTML = `
        <span class="badge"><img src="badge-${mod.nombre}.svg" alt="${mod.nombre} badge"></span>
        <a class="link" href="${mod.ruta_html}">🔧 ${mod.nombre}</a>
        <div class="timestamp">Validado: ${mod.timestamp}</div>
        <button onclick="enviarWebhook('${mod.nombre}')">📤 Enviar Webhook</button>
      `;
      container.appendChild(div);
    });
  });
