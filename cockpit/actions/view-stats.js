const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const productPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(productPath)) {
    console.log('📭 No hay productos registrados.');
    return;
  }

  const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
  const total = products.length;
  const published = products.filter(p => p.published).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  console.log('\n📈 Estadísticas generales:');
  console.log(`- Total de productos: ${total}`);
  console.log(`- Publicados: ${published}`);
  console.log(`- Stock total: ${totalStock} unidades`);
};
