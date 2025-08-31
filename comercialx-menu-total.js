#!/usr/bin/env node
const inquirer = require('inquirer');
const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api'; // Ajusta según tu backend
let tokenSesion = null;

const opciones = [
  { name: '1) Buscar opción...', value: 'buscar' },
  { name: '2) Iniciar sesión', value: 'login' },
  { name: '3) Crear nuevo usuario', value: 'crear_usuario' },
  { name: '4) Crear nuevo producto', value: 'crear_producto' },
  { name: '5) Publicar producto existente', value: 'publicar_producto' },
  { name: '6) Editar producto existente', value: 'editar_producto' },
  { name: '7) Eliminar producto', value: 'eliminar_producto' },
  { name: '8) Ver inventario', value: 'ver_inventario' },
  { name: '9) Flujo de caja', value: 'flujo_caja' },
  { name: '10) Ver stock por producto', value: 'stock_producto' },
  { name: '11) Ver estadísticas generales', value: 'estadisticas' },
  { name: '12) Buscar producto por nombre', value: 'buscar_producto' },
  { name: '13) Ver reportes filtrados', value: 'reportes' },
  { name: '14) Exportar auditoría en Markdown', value: 'exportar_md' },
  { name: '15) Filtrar historial de auditoría', value: 'filtrar_auditoria' },
  { name: '16) Ver firma local de sesión', value: 'firma_sesion' },
  { name: '17) Activar modo sandbox', value: 'sandbox' },
  { name: '18) Copilot CLI integrado', value: 'copilot' },
  { name: '19) Ejecutar plugin Analytics', value: 'analytics' },
  { name: '20) Cerrar sesión', value: 'cerrar_sesion' },
  { name: '21) Salir del sistema', value: 'salir' },
  { name: '22) Exportaciones cockpitizadas', value: 'exportaciones' },
];

async function mostrarMenuFiltrado() {
  const { filtro } = await inquirer.prompt([
    { type: 'input', name: 'filtro', message: '🔍 Filtra menú por palabra clave (ENTER para ver todo):' },
  ]);

  let opcionesFiltradas = opciones;
  if (filtro) opcionesFiltradas = opciones.filter(o => o.name.toLowerCase().includes(filtro.toLowerCase()));

  const { opcion } = await inquirer.prompt([
    { type: 'list', name: 'opcion', message: '===== COMERCIALX COCKPIT MENU =====', choices: opcionesFiltradas },
  ]);

  return opcion;
}

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case 'buscar': console.log('🔍 Buscar opción'); break;
    case 'login': await iniciarSesion(); break;
    case 'crear_usuario': await crearUsuario(); break;
    case 'crear_producto': await crearProducto(); break;
    case 'publicar_producto': await publicarProducto(); break;
    case 'editar_producto': await editarProducto(); break;
    case 'eliminar_producto': await eliminarProducto(); break;
    case 'ver_inventario': await verInventario(); break;
    case 'flujo_caja': await flujoCaja(); break;
    case 'stock_producto': await stockProducto(); break;
    case 'estadisticas': await estadisticas(); break;
    case 'buscar_producto': await buscarProducto(); break;
    case 'reportes': await reportesFiltrados(); break;
    case 'exportar_md': await exportarAuditoria(); break;
    case 'filtrar_auditoria': await filtrarAuditoria(); break;
    case 'firma_sesion': await verFirma(); break;
    case 'sandbox': console.log('🧪 Modo sandbox activado'); break;
    case 'copilot': console.log('🤖 Copilot CLI integrado'); break;
    case 'analytics': console.log('📈 Plugin Analytics ejecutado'); break;
    case 'cerrar_sesion': tokenSesion = null; console.log('🚪 Sesión cerrada'); break;
    case 'exportaciones': await exportacionesCockpit(); break;
    case 'salir': console.log('🚪 Saliendo del sistema...'); process.exit(0);
    default: console.log('❌ Opción inválida'); break;
  }
}

// -------------------- FUNCIONES REALES --------------------
async function crearUsuario() {
  const { nombre, correo, password } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nombre:' },
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' },
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/users`, { nombre, correo, password });
    console.log('✅ Usuario creado:', res.data);
  } catch (err) { console.log('❌ Error al crear usuario:', err.response?.data?.message || err.message); }
}

async function iniciarSesion() {
  const { correo, password } = await inquirer.prompt([
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' },
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { correo, password });
    tokenSesion = res.data.token;
    console.log('✅ Sesión iniciada correctamente');
  } catch (err) { console.log('❌ Error al iniciar sesión:', err.response?.data?.message || err.message); }
}

async function crearProducto() {
  const { nombre, precio, stock } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nombre del producto:' },
    { type: 'number', name: 'precio', message: 'Precio:' },
    { type: 'number', name: 'stock', message: 'Stock inicial:' },
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/productos`, { nombre, precio, stock }, {
      headers: tokenSesion ? { Authorization: `Bearer ${tokenSesion}` } : {},
    });
    console.log('✅ Producto creado:', res.data);
  } catch (err) { console.log('❌ Error al crear producto:', err.response?.data?.message || err.message); }
}

async function flujoCaja() {
  try {
    const res = await axios.get(`${BASE_URL}/flujo-caja`, {
      headers: tokenSesion ? { Authorization: `Bearer ${tokenSesion}` } : {},
    });
    console.table(res.data);
  } catch (err) { console.log('❌ Error al consultar flujo de caja:', err.response?.data?.message || err.message); }
}

// -------------------- FUNCIONES ADICIONALES --------------------
async function publicarProducto() { console.log('🛒 Publicar producto ejecutado'); }
async function editarProducto() { console.log('✏️ Editar producto ejecutado'); }
async function eliminarProducto() { console.log('❌ Eliminar producto ejecutado'); }
async function verInventario() { console.log('📦 Inventario mostrado'); }
async function stockProducto() { console.log('📦 Stock por producto mostrado'); }
async function estadisticas() { console.log('📈 Estadísticas generales mostradas'); }
async function buscarProducto() { console.log('🔍 Buscar producto ejecutado'); }
async function reportesFiltrados() { console.log('📊 Reportes filtrados mostrados'); }
async function exportarAuditoria() { console.log('📝 Exportar auditoría Markdown ejecutado'); }
async function filtrarAuditoria() { console.log('🧾 Filtrar historial de auditoría ejecutado'); }
async function verFirma() { console.log('🔐 Ver firma local ejecutado'); }
async function exportacionesCockpit() { console.log('📊 Exportaciones cockpitizadas ejecutadas'); }

// -------------------- LOOP PRINCIPAL --------------------
async function main() {
  while(true) {
    const opcion = await mostrarMenuFiltrado();
    await ejecutarOpcion(opcion);
    await inquirer.prompt([{ type: 'input', name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  }
}

main();
