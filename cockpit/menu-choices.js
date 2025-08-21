async function main() {
const { choice } = await inquirer.prompt([
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
}
main()
