const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const productPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(productPath)) {
    console.log('📭 No hay productos registrados.');
    return;
  }

  const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
  console.log('\n📦 Stock por producto:');
  products.forEach(p => {
    console.log(`- ${p.name} (ID: ${p.id}) → ${p.stock} unidades`);
  });
};
