async function main() {
module.exports = async (archivar) => {
  const inquirer = require('inquirer');
  const chalk = require('chalk');

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '🛒 Panel Comprador - Seleccione una opción:',
      choices: [
        'Buscar productos',
        'Ver carrito',
        'Confirmar compra',
        'Rastrear pedido',
        'Salir'
      ]
    }
  ]);

  console.log(chalk.green(`\n✅ Acción: ${opcion}\n`));
  archivar('comprador', opcion);
};
}
main()
