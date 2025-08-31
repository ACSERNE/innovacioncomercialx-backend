#!/usr/bin/env node
const inquirer = require('inquirer');
const axios = require('axios');

const BASE_URL = 'http://localhost:5002/api';
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

function printJSON(data) { console.log(JSON.stringify(data, null, 2)); }

function axiosHeaders() {
  return tokenSesion ? { Authorization: `Bearer ${tokenSesion}` } : {};
}

async function crearUsuario() {
  const datos = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nombre:' },
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' },
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/users`, datos);
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function iniciarSesion() {
  const credenciales = await inquirer.prompt([
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' },
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/users/login`, credenciales);
    tokenSesion = res.data.token;
    printJSON({ mensaje: 'Sesión iniciada', token: tokenSesion });
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function crearProducto() {
  if (!tokenSesion) { printJSON({ error: 'Debes iniciar sesión primero' }); return; }
  const datos = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nombre del producto:' },
    { type: 'number', name: 'precio', message: 'Precio:' },
    { type: 'number', name: 'stock', message: 'Stock inicial:' },
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/productos`, datos, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function publicarProducto() {
  if (!tokenSesion) { printJSON({ error: 'Debes iniciar sesión primero' }); return; }
  const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID del producto a publicar:' }]);
  try {
    const res = await axios.post(`${BASE_URL}/productos/${id}/publicar`, {}, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function editarProducto() {
  if (!tokenSesion) { printJSON({ error: 'Debes iniciar sesión primero' }); return; }
  const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID del producto a editar:' }]);
  const datos = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nuevo nombre:' },
    { type: 'number', name: 'precio', message: 'Nuevo precio:' },
    { type: 'number', name: 'stock', message: 'Nuevo stock:' },
  ]);
  try {
    const res = await axios.put(`${BASE_URL}/productos/${id}`, datos, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function eliminarProducto() {
  if (!tokenSesion) { printJSON({ error: 'Debes iniciar sesión primero' }); return; }
  const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID del producto a eliminar:' }]);
  try {
    const res = await axios.delete(`${BASE_URL}/productos/${id}`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function verInventario() {
  try {
    const res = await axios.get(`${BASE_URL}/productos`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function verStockProducto() {
  const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID del producto:' }]);
  try {
    const res = await axios.get(`${BASE_URL}/productos/${id}`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function verEstadisticas() {
  try {
    const res = await axios.get(`${BASE_URL}/estadisticas`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function verReportes() {
  try {
    const res = await axios.get(`${BASE_URL}/reportes`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function buscarProducto() {
  const { nombre } = await inquirer.prompt([{ type: 'input', name: 'nombre', message: 'Nombre del producto:' }]);
  try {
    const res = await axios.get(`${BASE_URL}/productos?nombre=${encodeURIComponent(nombre)}`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function filtrarAuditoria() {
  const { filtro } = await inquirer.prompt([{ type: 'input', name: 'filtro', message: 'Filtro auditoría:' }]);
  try {
    const res = await axios.get(`${BASE_URL}/auditoria?filtro=${encodeURIComponent(filtro)}`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function flujoCaja() {
  try {
    const res = await axios.get(`${BASE_URL}/flujo_caja`, { headers: axiosHeaders() });
    printJSON(res.data);
  } catch (err) { printJSON(err.response?.data || { error: err.message }); }
}

async function exportarMarkdown() { printJSON({ info: 'Exportar Markdown simulado' }); }
async function verFirmaSesion() { printJSON({ info: 'Firma de sesión simulado' }); }
async function modoSandbox() { printJSON({ info: 'Sandbox activado simulado' }); }
async function copilotCLI() { printJSON({ info: 'Copilot CLI simulado' }); }
async function pluginAnalytics() { printJSON({ info: 'Plugin Analytics simulado' }); }
async function cerrarSesion() { tokenSesion = null; printJSON({ info: 'Sesión cerrada' }); }
async function exportacionesCockpit() { printJSON({ info: 'Exportaciones cockpitizadas simulado' }); }

async function mostrarMenu() {
  let salir = false;
  while (!salir) {
    const { opcion } = await inquirer.prompt([{ type: 'list', name: 'opcion', message: 'Selecciona una opción:', choices: opciones }]);
    switch (opcion) {
      case 'buscar': printJSON({ info: 'Buscar opción simulado' }); break;
      case 'login': await iniciarSesion(); break;
      case 'crear_usuario': await crearUsuario(); break;
      case 'crear_producto': await crearProducto(); break;
      case 'publicar_producto': await publicarProducto(); break;
      case 'editar_producto': await editarProducto(); break;
      case 'eliminar_producto': await eliminarProducto(); break;
      case 'ver_inventario': await verInventario(); break;
      case 'flujo_caja': await flujoCaja(); break;
      case 'stock_producto': await verStockProducto(); break;
      case 'estadisticas': await verEstadisticas(); break;
      case 'buscar_producto': await buscarProducto(); break;
      case 'reportes': await verReportes(); break;
      case 'exportar_md': await exportarMarkdown(); break;
      case 'filtrar_auditoria': await filtrarAuditoria(); break;
      case 'firma_sesion': await verFirmaSesion(); break;
      case 'sandbox': await modoSandbox(); break;
      case 'copilot': await copilotCLI(); break;
      case 'analytics': await pluginAnalytics(); break;
      case 'cerrar_sesion': await cerrarSesion(); break;
      case 'exportaciones': await exportacionesCockpit(); break;
      case 'salir': printJSON({ info: 'Saliendo del sistema' }); salir = true; break;
      default: printJSON({ error: 'Opción no reconocida' });
    }
    console.log('\n');
  }
}

mostrarMenu();
