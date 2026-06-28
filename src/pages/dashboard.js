import { apiRequest } from "../services/api.js";
import { getToken } from "../services/auth.js";

async function cargarProductos() {
  const token = getToken();
  const productos = await apiRequest("/api/producto", "GET", null, token);

  const cont = document.getElementById("productos");
  cont.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = \`
      <h3>\${p.nombre}</h3>
      <p>\${p.descripcion}</p>
      <strong>$\${p.precio}</strong>
    \`;
    cont.appendChild(div);
  });
}

cargarProductos();
