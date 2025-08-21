async function main() {
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const productPath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = async () => {
  const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
  const unpublished = products.filter(p => !p.published);

  if (unpublished.length === 0) {
    console.log('📭 No hay productos pendientes de publicación.');
    return;
  }

  const { selected } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'selected',
      message: '🛒 Elige un producto para publicar:',
      choices: unpublished.map(p => `${p.id} — ${p.name} ($${p.price})`)
    }
  ]);

  const id = selected.split(' — ')[0];
  const index = products.findIndex(p => p.id === id);
  products[index].published = true;

  fs.writeFileSync(productPath, JSON.stringify(products, null, 2));
  console.log(`✅ Producto "${products[index].name}" publicado.`);
};
}
main()
