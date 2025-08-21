async function main() {
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

module.exports = async () => {
  const productPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(productPath)) {
    console.log('📭 No hay productos registrados.');
    return;
  }

  const { query } = await inquirer.prompt([
    { type: 'input', name: 'query', message: '🔍 Buscar producto por nombre:' }
  ]);

  const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
  const results = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  if (results.length === 0) {
    console.log('🚫 No se encontraron coincidencias.');
  } else {
    console.log('\n🔎 Resultados:');
    results.forEach(p => {
      console.log(`- ${p.name} (ID: ${p.id}) — $${p.price} — Stock: ${p.stock}`);
    });
  }
};
}
main()
