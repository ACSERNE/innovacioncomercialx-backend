async function main() {
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const productPath = path.join(__dirname, '..', 'data', 'products.json');

const generateId = () => {
  const prefix = 'P';
  const timestamp = Date.now().toString().slice(-6);
  return `${prefix}${timestamp}`;
};

module.exports = async () => {
  const { name, price, stock } = await inquirer.prompt([
    { type: 'input', name: 'name', message: '🛒 Nombre del producto:' },
    { type: 'number', name: 'price', message: '💰 Precio:' },
    { type: 'number', name: 'stock', message: '📦 Stock inicial:' }
  ]);

  const id = generateId();
  const newProduct = {
    id,
    name,
    price,
    stock,
    published: false
  };

  const products = fs.existsSync(productPath)
    ? JSON.parse(fs.readFileSync(productPath, 'utf-8'))
    : [];

  products.push(newProduct);
  fs.writeFileSync(productPath, JSON.stringify(products, null, 2));

  console.log(`✅ Producto creado: ${name} (ID: ${id})`);
};
}
main()
