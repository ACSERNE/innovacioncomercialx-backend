let editandoId = null;

async function cargarProductos() {
  const productos = await fetch('/api/productos', {
    headers: authHeaders()
  }).then(r => r.json());

  document.getElementById('lista').innerHTML = `
    <table>
      <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
      ${productos.map(p => `
        <tr>
          <td>${p.nombre}</td>
          <td>\$${p.precio}</td>
          <td>${p.stock}</td>
          <td>
            <button onclick="editar(${p.id})">Editar</button>
            <button onclick="eliminar(${p.id})">Eliminar</button>
          </td>
        </tr>
      `).join('')}
    </table>
  `;
}

function mostrarCrear() {
  editandoId = null;
  document.getElementById('titulo-form').innerText = "Nuevo Producto";
  document.getElementById('formulario').style.display = "block";
}

async function editar(id) {
  editandoId = id;

  const p = await fetch('/api/productos/' + id, {
    headers: authHeaders()
  }).then(r => r.json());

  document.getElementById('titulo-form').innerText = "Editar Producto";
  document.getElementById('nombre').value = p.nombre;
  document.getElementById('descripcion').value = p.descripcion;
  document.getElementById('precio').value = p.precio;
  document.getElementById('stock').value = p.stock;

  document.getElementById('formulario').style.display = "block";
}

async function guardar() {
  const data = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    precio: parseFloat(document.getElementById('precio').value),
    stock: parseInt(document.getElementById('stock').value)
  };

  if (editandoId) {
    await fetch('/api/productos/' + editandoId, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data)
    });
  } else {
    await fetch('/api/productos', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data)
    });
  }

  cancelar();
  cargarProductos();
}

async function eliminar(id) {
  await fetch('/api/productos/' + id, {
    method: 'DELETE',
    headers: authHeaders()
  });

  cargarProductos();
}

function cancelar() {
  document.getElementById('formulario').style.display = "none";
}

cargarProductos();
