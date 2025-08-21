import inquirer from 'inquirer'

export default async function mainMenu(usuario) {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: `¿Qué desea hacer, ${usuario.nombre}?`,
      choices: ['Ver productos', 'Exportar reporte', 'Salir']
    }
  ])

  console.log(`🧭 Opción seleccionada: ${opcion}`)
}
