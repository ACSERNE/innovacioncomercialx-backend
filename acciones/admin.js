async function main() {
module.exports = async (archivar) => {
  const inquirer = require('inquirer');
  const chalk = require('chalk');

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '📦 Panel Admin - Seleccione una opción:',
      choices: [
        'Ver inventario',
        'Agregar producto',
        'Registrar venta',
        'Ver flujo de caja',
        'Salir'
      ]
    }
  ]);

  console.log(chalk.green(`\n✅ Acción: ${opcion}\n`));
  archivar('admin', opcion);
};
}
main()
