async function main() {
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const productPath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = async () => {
  const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));

  if (products.length === 0) {
    console.log('📭 No hay productos para eliminar.');
    return;
  }

  const { selected } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'selected',
      message: '❌ Elige un producto para eliminar:',
      choices: products.map(p => `${p.id} — ${p.name} ($${p.price})`)
    }
  ]);

  const id = selected.split(' — ')[0];
  const index = products.findIndex(p => p.id === id);

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `¿Estás seguro de eliminar "${products[index].name}"?`,
      default: false
    }
  ]);

  if (confirm) {
    products.splice(index, 1);
    fs.writeFileSync(productPath, JSON.stringify(products, null, 2));
    console.log(`🗑️ Producto eliminado: ${id}`);
  } else {
    console.log('🚫 Eliminación cancelada.');
  }
};
}
main()
