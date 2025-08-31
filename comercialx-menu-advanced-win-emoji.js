#!/usr/bin/env node
const inquirer = require('inquirer');

const opciones = [
  { name: '1) 🔍 Buscar opción...', value: 'buscar' },
  { name: '2) 🔄 Iniciar sesión', value: 'login' },
  { name: '3) 🧑‍💼 Crear nuevo usuario', value: 'crear_usuario' },
  { name: '4) 🆕 Crear nuevo producto', value: 'crear_producto' },
  { name: '5) 🛒 Publicar producto existente', value: 'publicar_producto' },
  { name: '6) ✏️ Editar producto existente', value: 'editar_producto' },
  { name: '7) ❌ Eliminar producto', value: 'eliminar_producto' },
  { name: '8) 📦 Ver inventario', value: 'ver_inventario' },
  { name: '9) 💰 Flujo de caja', value: 'flujo_caja' },
  { name: '10) 📦 Ver stock por producto', value: 'stock_producto' },
  { name: '11) 📈 Ver estadísticas generales', value: 'estadisticas' },
  { name: '12) 🔍 Buscar producto por nombre', value: 'buscar_producto' },
  { name: '13) 📊 Ver reportes filtrados', value: 'reportes' },
  { name: '14) 📝 Exportar auditoría en Markdown', value: 'exportar_md' },
  { name: '15) 🧾 Filtrar historial de auditoría', value: 'filtrar_auditoria' },
  { name: '16) 🔐 Ver firma local de sesión', value: 'firma_sesion' },
  { name: '17) 🧪 Activar modo sandbox', value: 'sandbox' },
  { name: '18) 🤖 Copilot CLI integrado', value: 'copilot' },
  { name: '19) 📈 Ejecutar plugin Analytics', value: 'analytics' },
  { name: '20) 🚪 Cerrar sesión', value: 'cerrar_sesion' },
  { name: '21) 🚪 Salir del sistema', value: 'salir' },
  { name: '22) 📊 Exportaciones cockpitizadas', value: 'exportaciones' },
];

async function mostrarMenuFiltrado() {
  const { filtro } = await inquirer.prompt([
    {
      type: 'input',
      name: 'filtro',
      message: '🔍 Filtra menú por palabra clave (ENTER para ver todo):',
    },
  ]);

  let opcionesFiltradas = opciones;
  if (filtro) {
    opcionesFiltradas = opciones.filter(o =>
      o.name.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '===== COMERCIALX COCKPIT MENU =====',
      choices: opcionesFiltradas,
    },
  ]);

  return opcion;
}

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case 'buscar': console.log('🔍 Buscar opción seleccionado'); break;
    case 'login': console.log('🔄 Iniciar sesión seleccionado'); break;
    case 'crear_usuario': console.log('🧑‍💼 Crear nuevo usuario seleccionado'); break;
    case 'crear_producto': console.log('🆕 Crear nuevo producto seleccionado'); break;
    case 'publicar_producto': console.log('🛒 Publicar producto existente seleccionado'); break;
    case 'editar_producto': console.log('✏️ Editar producto existente seleccionado'); break;
    case 'eliminar_producto': console.log('❌ Eliminar producto seleccionado'); break;
    case 'ver_inventario': console.log('📦 Ver inventario'); break;
    case 'flujo_caja': console.log('💰 Flujo de caja'); break;
    case 'stock_producto': console.log('📦 Stock por producto'); break;
    case 'estadisticas': console.log('📈 Estadísticas generales'); break;
    case 'buscar_producto': console.log('🔍 Buscar producto por nombre'); break;
    case 'reportes': console.log('📊 Ver reportes filtrados'); break;
    case 'exportar_md': console.log('📝 Exportar auditoría Markdown'); break;
    case 'filtrar_auditoria': console.log('🧾 Filtrar historial de auditoría'); break;
    case 'firma_sesion': console.log('🔐 Ver firma local de sesión'); break;
    case 'sandbox': console.log('🧪 Activar modo sandbox'); break;
    case 'copilot': console.log('🤖 Copilot CLI integrado'); break;
    case 'analytics': console.log('📈 Ejecutar plugin Analytics'); break;
    case 'cerrar_sesion': console.log('🚪 Cerrar sesión'); break;
    case 'exportaciones': console.log('📊 Exportaciones cockpitizadas'); break;
    case 'salir':
      console.log('🚪 Saliendo del sistema...');
      process.exit(0);
    default: console.log('❌ Opción inválida'); break;
  }
}

async function main() {
  while(true) {
    const opcion = await mostrarMenuFiltrado();
    await ejecutarOpcion(opcion);
    await inquirer.prompt([{ type: 'input', name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  }
}

main();
