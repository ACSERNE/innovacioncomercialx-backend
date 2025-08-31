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

async function mostrarMenu() {
  const { opcion } = await inquirer.prompt([{
    type: 'list',
    name: 'opcion',
    message: '===== COMERCIALX COCKPIT MENU =====',
    choices: opciones,
  }]);
  return opcion;
}

// Funciones de ejemplo funcionales con Axios
async function iniciarSesion() {
  const { correo, password } = await inquirer.prompt([
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' }
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { correo, password });
    tokenSesion = res.data.token;
    console.log('✅ Sesión iniciada correctamente');
  } catch (err) {
    console.log('❌ Error al iniciar sesión:', err.response?.data?.message || err.message);
  }
}

async function crearUsuario() {
  const { nombre, correo, password, role } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nombre:' },
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' },
    { type: 'list', name: 'role', message: 'Rol:', choices: ['admin', 'user'] },
  ]);
  try {
    const res = await axios.post(`${BASE_URL}/users`, { nombre, correo, password, role }, {
      headers: tokenSesion ? { Authorization: `Bearer ${tokenSesion}` } : {},
    });
    console.log('✅ Usuario creado:', res.data.nombre);
  } catch (err) {
    console.log('❌ Error al crear usuario:', err.response?.data?.message || err.message);
  }
}

// Aquí puedes expandir con Axios a tu backend para cada opción real
async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case 'login': await iniciarSesion(); break;
    case 'crear_usuario': await crearUsuario(); break;
    case 'crear_producto': console.log('🆕 Crear producto'); break;
    case 'publicar_producto': console.log('🛒 Publicar producto'); break;
    case 'editar_producto': console.log('✏️ Editar producto'); break;
    case 'eliminar_producto': console.log('❌ Eliminar producto'); break;
    case 'ver_inventario': console.log('📦 Ver inventario'); break;
    case 'flujo_caja': console.log('💰 Flujo de caja'); break;
    case 'stock_producto': console.log('📦 Stock por producto'); break;
    case 'estadisticas': console.log('📈 Estadísticas generales'); break;
    case 'buscar_producto': console.log('🔍 Buscar producto por nombre'); break;
    case 'reportes': console.log('📊 Reportes filtrados'); break;
    case 'exportar_md': console.log('📝 Exportar auditoría Markdown'); break;
    case 'filtrar_auditoria': console.log('🧾 Filtrar historial auditoría'); break;
    case 'firma_sesion': console.log('🔐 Ver firma local de sesión'); break;
    case 'sandbox': console.log('🧪 Activar modo sandbox'); break;
    case 'copilot': console.log('🤖 Copilot CLI integrado'); break;
    case 'analytics': console.log('📈 Ejecutar plugin Analytics'); break;
    case 'cerrar_sesion': tokenSesion=null; console.log('🚪 Sesión cerrada'); break;
    case 'exportaciones': console.log('📊 Exportaciones cockpitizadas'); break;
    case 'salir': console.log('🚪 Saliendo del sistema...'); process.exit(0);
    default: console.log('❌ Opción inválida'); break;
  }
}

async function main() {
  while(true) {
    const opcion = await mostrarMenu();
    await ejecutarOpcion(opcion);
    await inquirer.prompt([{ type: 'input', name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  }
}

main();
