#!/usr/bin/env node

const inquirer = require('inquirer');

// Funciones simuladas para cada opción
const opciones = {
  'Iniciar sesión': () => console.log('🔄 Iniciando sesión...'),
  'Crear nuevo usuario': () => console.log('🧑‍💼 Creando usuario...'),
  'Crear nuevo producto': () => console.log('🆕 Creando producto...'),
  'Publicar producto existente': () => console.log('🛒 Publicando producto...'),
  'Editar producto existente': () => console.log('✏️ Editando producto...'),
  'Eliminar producto': () => console.log('❌ Eliminando producto...'),
  'Ver inventario': () => console.log('📦 Mostrando inventario...'),
  'Flujo de caja': () => console.log('💰 Calculando flujo de caja...'),
  'Ver stock por producto': () => console.log('📦 Mostrando stock por producto...'),
  'Ver estadísticas generales': () => console.log('📈 Mostrando estadísticas generales...'),
  'Buscar producto por nombre': () => console.log('🔍 Buscando producto...'),
  'Ver reportes filtrados': () => console.log('📊 Mostrando reportes filtrados...'),
  'Exportar auditoría en Markdown': () => console.log('📝 Exportando auditoría...'),
  'Filtrar historial de auditoría': () => console.log('🧾 Filtrando historial...'),
  'Ver firma local de sesión': () => console.log('🔐 Mostrando firma de sesión...'),
  'Activar modo sandbox': () => console.log('🧪 Modo sandbox activado...'),
  'Copilot CLI integrado': () => console.log('🤖 Ejecutando Copilot CLI...'),
  'Ejecutar plugin Analytics': () => console.log('📈 Ejecutando plugin Analytics...'),
  'Cerrar sesión': () => console.log('🚪 Cerrando sesión...'),
  'Salir del sistema': () => {
    console.log('👋 Saliendo del sistema...');
    process.exit(0);
  }
};

async function mainMenu() {
  while (true) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: 'Bienvenido a ComercialX Cockpit\nSelecciona una opción:',
        choices: Object.keys(opciones),
        pageSize: 20
      }
    ]);

    console.clear();
    await opciones[opcion]();
    console.log('\n🔹 Presiona Enter para volver al menú...');
    await inquirer.prompt([{ name: 'enter', message: '', type: 'input' }]);
    console.clear();
  }
}

mainMenu();
