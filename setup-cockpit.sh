#!/bin/bash

echo "🚀 Iniciando setup de ComercialX Cockpit..."

mkdir -p comercialx-cockpit/exports/onboarding
mkdir -p comercialx-cockpit/exports/badges
mkdir -p comercialx-cockpit/data

# Micrositio cockpitizado
cat <<'HTML' > comercialx-cockpit/index.html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Cockpit | ComercialX</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f0f0f0; }
    h2, h3 { color: #222; margin-top: 2rem; }
    select, button { margin: 0.5rem; padding: 0.5rem; font-size: 1rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: #fff; }
    th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; }
    .section { margin-top: 3rem; }
    .precio { font-weight: bold; color: #007700; margin-top: 1rem; }
  </style>
</head>
<body>

  <h2>🧭 Selector cockpitizado</h2>
  <select id="tipoFiltro" onchange="mostrarPrecio()">
    <option value="">Todos los tipos</option>
    <option value="fisica">🏪 Física</option>
    <option value="online">🛒 Online</option>
    <option value="hibrida">🔀 Híbrida</option>
    <option value="demo">🎁 Demo</option>
  </select>

  <select id="entornoFiltro">
    <option value="">Todos los entornos</option>
    <option value="dev">Dev</option>
    <option value="prod">Prod</option>
    <option value="test">Test</option>
  </select>

  <div id="precioSeleccionado" class="precio">💲 Precio: —</div>

  <button onclick="filtrarLog()">🔍 Filtrar log</button>
  <button onclick="exportarCSV()">📄 Exportar CSV</button>
  <button onclick="activarOnboarding()">🚀 Activar Onboarding</button>

  <div class="section">
    <h3>📊 Log técnico tabular</h3>
    <table id="tablaLog">
      <thead>
        <tr><th>Fecha</th><th>Tipo</th><th>Entorno</th><th>Acción</th><th>Precio</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>

  <script>
    let logData = [];

    const precios = {
      fisica: "$69.990",
      online: "$59.990",
      hibrida: "$89.990",
      demo: "🎁 Gratis"
    };

    function mostrarPrecio() {
      const tipo = document.getElementById('tipoFiltro').value;
      const precio = precios[tipo] || "—";
      document.getElementById('precioSeleccionado').innerText = `💲 Precio: ${precio}`;
    }

    function cargarLog() {
      fetch('exports/onboarding/onboarding.log')
        .then(response => response.text())
        .then(data => {
          logData = data.trim().split('\n').map(line => {
            const [fecha, tipo, entorno, accion, precio] = line.split('|');
            return { fecha, tipo, entorno, accion, precio };
          });
          renderizarTabla(logData);
        });
    }

    function renderizarTabla(data) {
      const tbody = document.querySelector('#tablaLog tbody');
      tbody.innerHTML = '';
      data.forEach(entry => {
        const row = `<tr>
          <td>${entry.fecha}</td>
          <td>${entry.tipo}</td>
          <td>${entry.entorno}</td>
          <td>${entry.accion}</td>
          <td>${entry.precio}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    }

    function filtrarLog() {
      const tipo = document.getElementById('tipoFiltro').value;
      const entorno = document.getElementById('entornoFiltro').value;
      const filtrado = logData.filter(entry =>
        (!tipo || entry.tipo === tipo) &&
        (!entorno || entry.entorno === entorno)
      );
      renderizarTabla(filtrado);
    }

    function exportarCSV() {
      const csv = logData.map(e => `${e.fecha},${e.tipo},${e.entorno},${e.accion},${e.precio}`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'onboarding.csv';
      a.click();
      URL.revokeObjectURL(url);
    }

    function activarOnboarding() {
      const tipo = document.getElementById('tipoFiltro').value;
      const entorno = document.getElementById('entornoFiltro').value;
      const precio = precios[tipo] || "—";
      const fecha = new Date().toISOString().split('T')[0];
      const accion = "Onboarding activado";

      if (!tipo || !entorno) {
        alert("Selecciona tipo de tienda y entorno.");
        return;
      }

      const nuevoLog = { fecha, tipo, entorno, accion, precio };
      logData.push(nuevoLog);
      renderizarTabla(logData);
      alert(`✅ ${accion} para ${tipo} en ${entorno} con precio ${precio}`);
    }

    window.onload = cargarLog;
  </script>

</body>
</html>
HTML

# Log técnico
cat <<'EOFLOG' > comercialx-cockpit/exports/onboarding/onboarding.log
2025-08-15|fisica|dev|Activación de onboarding|$69.990
2025-08-15|online|prod|Registro exitoso|$59.990
2025-08-15|demo|test|Prueba gratuita iniciada|🎁 Gratis
EOFLOG

# README
cat <<'EOFMD' > comercialx-cockpit/exports/onboarding/README.md
# 📘 ComercialX Cockpit | Onboarding Técnico

Este micrositio permite activar onboarding por tipo de tienda:

- 🏪 Tienda Física → $69.990
- 🛒 Tienda Online → $59.990
- 🔀 Híbrida → $89.990
- 🎁 Demo Técnica → Gratis

Incluye log técnico, exportación CSV y badge SVG por entorno.
EOFMD

# Badge SVG
cat <<'EOFSVG' > comercialx-cockpit/exports/badges/dev.svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
  <rect width="120" height="20" fill="#555"/>
  <rect x="60" width="60" height="20" fill="#4c1"/>
  <text x="30" y="14" fill="#fff" font-family="Verdana" font-size="11">entorno</text>
  <text x="75" y="14" fill="#fff" font-family="Verdana" font-size="11">dev</text>
</svg>
EOFSVG

# Flujo de caja
cat <<'EOFJSON' > comercialx-cockpit/data/flujo-caja.json
[
  { "fecha": "2025-08-15", "tipo": "fisica", "entorno": "dev", "ingreso": 120000, "egreso": 45000 },
  { "fecha": "2025-08-15", "tipo": "online", "entorno": "prod", "ingreso": 250000, "egreso": 80000 },
  { "fecha": "2025-08-15", "tipo": "demo", "entorno": "test", "ingreso": 0, "egreso": 0 }
]
EOFJSON

# Inventario
cat <<'EOFJSON' > comercialx-cockpit/data/inventario.json
[
  { "producto": "Zapatos", "categoria": "Calzado", "stock": 120, "entorno": "dev" },
  { "producto": "Notebook", "categoria": "Electrónica", "stock": 35, "entorno": "prod" },
  { "producto": "DemoPack", "categoria": "Demo", "stock": "∞", "entorno": "test" }
]
EOFJSON

echo "✅ ComercialX Cockpit generado en ./comercialx-cockpit"
