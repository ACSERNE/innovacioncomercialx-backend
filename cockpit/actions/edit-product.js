async function main() {
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const productPath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = async () => {
  const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));

  if (products.length === 0) {
    console.log('📭 No hay productos para editar.');
    return;
  }

  const { selected } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'selected',
      message: '✏️ Elige un producto para editar:',
      choices: products.map(p => `${p.id} — ${p.name} ($${p.price})`)
    }
  ]);

  const id = selected.split(' — ')[0];
  const index = products.findIndex(p => p.id === id);
  const product = products[index];

  const { name, price, stock } = await inquirer.prompt([
    { type: 'input', name: 'name', message: `🛒 Nombre [${product.name}]:`, default: product.name },
    { type: 'number', name: 'price', message: `💰 Precio [${product.price}]:`, default: product.price },
    { type: 'number', name: 'stock', message: `📦 Stock [${product.stock}]:`, default: product.stock }
  ]);

  products[index] = { ...product, name, price, stock };
  fs.writeFileSync(productPath, JSON.stringify(products, null, 2));

  console.log(`✅ Producto actualizado: ${name} (ID: ${id})`);
};
}
main()
