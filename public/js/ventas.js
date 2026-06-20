let items = [];

async function cargarVentas() {
  const ventas = await fetch('/api/ventas', {
    headers: authHeaders()
  }).then(r => r.json());

  document.getElementById('lista').innerHTML = `
    <table>
      <tr>
        <th>ID</th>
        <th>Total</th>
        <th>Fecha</th>
        <th>Acciones</th>
      </tr>
      ${ventas.map(v => `
        <tr>
          <td>${v.id}</td>
          <td>\$${v.total}</td>
          <td>${new Date(v.createdAt).toLocaleString()}</td>
          <td><button onclick="detalle(${v.id})">Ver</button></td>
        </tr>
      `).join('')}
    </table>
  `;
}

function mostrarCrear() {
  items = [];
  document.getElementById('items').innerHTML = "";
  document.getElementById('formulario').style.display = "block";
}

function agregarItem() {
  const index = items.length;

  items.push({ productoId: null, cantidad: 1 });

  document.getElementById('items').innerHTML += `
    <div>
      <input placeholder="ID Producto" onchange="setProducto(${index}, this.value)">
      <input type="number" value="1" onchange="setCantidad(${index}, this.value)">
    </div>
  `;
}

function setProducto(i, val) {
  items[i].productoId = parseInt(val);
}

function setCantidad(i, val) {
  items[i].cantidad = parseInt(val);
}

async function guardar() {
  const data = {
    usuarioId: 1, // puedes reemplazarlo por req.user.id si lo deseas
    items
  };

  await fetch('/api/ventas', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });

  cancelar();
  cargarVentas();
}

function cancelar() {
  document.getElementById('formulario').style.display = "none";
}

async function detalle(id) {
  const venta = await fetch('/api/ventas/' + id, {
    headers: authHeaders()
  }).then(r => r.json());

  alert(`
Venta #${venta.id}
Total: \$${venta.total}

Items:
${venta.TransaccionDetalles.map(d => `
- ${d.Producto.nombre} x ${d.cantidad} = \$${d.cantidad * d.precio_unitario}
`).join('')}
  `);
}

cargarVentas();
