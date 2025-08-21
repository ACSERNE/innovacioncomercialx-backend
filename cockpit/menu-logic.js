async function main() {
const { choice } = await require('inquirer').prompt([
  {
    type: 'rawlist',
    name: 'choice',
    message: '🧭 Menú principal — Elige una opción:',
    choices: [
      '🔄 Iniciar sesión',
      '🧑‍💼 Crear nuevo usuario',
      '🆕 Crear nuevo producto',
      '🛒 Publicar producto existente',
      '✏️ Editar producto existente',
      '❌ Eliminar producto',
      '📦 Ver inventario',
      '💰 Flujo de caja',
      '📦 Ver stock por producto',
      '📈 Ver estadísticas generales',
      '🔍 Buscar producto por nombre',
      '📊 Ver reportes filtrados',
      '📝 Exportar auditoría en Markdown',
      '🧾 Filtrar historial de auditoría',
      '🔐 Ver firma local de sesión',
      '🧪 Activar modo sandbox',
      '🤖 Copilot CLI integrado',
      '📈 Ejecutar plugin Analytics',
      '🚪 Cerrar sesión',
      '🚪 Salir del sistema'
    ]
  }
]);

switch (choice) {
  case '🔄 Iniciar sesión':
    await require('./actions/login')();
    break;
  case '🧑‍💼 Crear nuevo usuario':
    await require('./actions/create-user')();
    break;
  case '🆕 Crear nuevo producto':
    await require('./actions/create-product')();
    logAction(session, 'Crear nuevo producto');
    break;
  case '🛒 Publicar producto existente':
    await require('./actions/publish-product')();
    logAction(session, 'Publicar producto');
    break;
  case '✏️ Editar producto existente':
    await require('./actions/edit-product')();
    logAction(session, 'Editar producto');
    break;
  case '❌ Eliminar producto':
    await require('./actions/delete-product')();
    logAction(session, 'Eliminar producto');
    break;
  case '📦 Ver inventario':
    const inventoryPath = path.join(__dirname, 'data', 'inventory.json');
    if (fs.existsSync(inventoryPath)) {
      console.log('\n📦 Inventario actual:');
      console.log(fs.readFileSync(inventoryPath, 'utf-8'));
    } else {
      console.log('📭 No hay inventario registrado.');
    }
    logAction(session, 'Ver inventario');
    break;
  case '💰 Flujo de caja':
    await require('./actions/cash-flow')();
    logAction(session, 'Flujo de caja');
    break;
  case '📦 Ver stock por producto':
    await require('./actions/view-stock')();
    logAction(session, 'Ver stock por producto');
    break;
  case '📈 Ver estadísticas generales':
    await require('./actions/view-stats')();
    logAction(session, 'Ver estadísticas');
    break;
  case '🔍 Buscar producto por nombre':
    await require('./actions/search-product')();
    logAction(session, 'Buscar producto');
    break;
  case '📊 Ver reportes filtrados':
    await require('./actions/view-reports')();
    logAction(session, 'Ver reportes');
    break;
  case '📝 Exportar auditoría en Markdown':
    await require('./actions/export-markdown')();
    logAction(session, 'Exportar auditoría Markdown');
    break;
  case '🧾 Filtrar historial de auditoría':
    await require('./actions/view-audit-log')();
    logAction(session, 'Filtrar historial de auditoría');
    break;
  case '🔐 Ver firma local de sesión':
    const signature = generateSignature(session.email);
    console.log(`🔒 Firma local: ${signature}`);
    logAction(session, 'Ver firma local');
    break;
  case '🧪 Activar modo sandbox':
    await require('./actions/sandbox')();
    logAction(session, 'Activar sandbox');
    break;
  case '🤖 Copilot CLI integrado':
    await require('./actions/copilot-cli')();
    logAction(session, 'Usar Copilot CLI');
    break;
  case '📈 Ejecutar plugin Analytics':
    await require('./plugins/analytics')();
    logAction(session, 'Ejecutar plugin Analytics');
    break;
  case '🚪 Cerrar sesión':
    if (fs.existsSync(sessionPath)) {
      fs.unlinkSync(sessionPath);
      console.log('👋 Sesión cerrada.');
      logAction({ email: 'unknown', role: 'unknown' }, 'Cerrar sesión');
    } else {
      console.log('📭 No hay sesión activa.');
    }
    break;
  case '🚪 Salir del sistema':
    console.log('👋 Cerrando cockpit CLI. Hasta pronto.');
    process.exit(0);
}
}
main()
