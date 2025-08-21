async function main() {
module.exports = async (archivar) => {
  const inquirer = require('inquirer');
  const chalk = require('chalk');

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '🛍️ Panel Vendedor - Seleccione una opción:',
      choices: [
        'Crear producto',
        'Publicar en tienda en línea',
        'Ver productos activos',
        'Ver estadísticas de ventas',
        'Salir'
      ]
    }
  ]);

  console.log(chalk.green(`\n✅ Acción: ${opcion}\n`));
  archivar('vendedor', opcion);
};
}
main()
