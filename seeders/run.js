const db = require('../models');

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('📦 Conectado a PostgreSQL para seeders');

    await require('./usuarios.seeder.js')();
    await require('./productos.seeder.js')();
    await require('./categorias.seeder.js')();
    await require('./transacciones.seeder.js')();
    await require('./detalles.seeder.js')();
    await require('./flujo.seeder.js')();
    await require('./alertas.seeder.js')();

    console.log('✅ Seeders ejecutados');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error ejecutando seeders:', err);
    process.exit(1);
  }
})();
