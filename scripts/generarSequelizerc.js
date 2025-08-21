const fs = require('fs');
const path = require('path');

function generarSequelizerc() {
  const contenido = `
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations')
};
`;

  const ruta = path.join(__dirname, '..', '.sequelizerc');

  try {
    fs.writeFileSync(ruta, contenido.trim());
    console.log(`✅ Archivo .sequelizerc creado en: ${ruta}`);
  } catch (err) {
    console.error('❌ Error al crear .sequelizerc:', err.message);
  }
}

generarSequelizerc();