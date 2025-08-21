// test-model.js
const db = require('./models');

async function test() {
  try {
    // Verificar conexión y sincronización
    await db.sequelize.authenticate();
    console.log('✅ Conexión a la base de datos OK');

    // Opcional: sincroniza sin borrar datos (solo para pruebas)
    // await db.sequelize.sync();

    // Buscar todos los usuarios
    const users = await db.User.findAll();
    console.log('Usuarios en DB:', users.length);
    users.forEach(u => {
      console.log(`- ${u.nombre} (${u.correo})`);
    });

  } catch (error) {
    console.error('Error en test:', error);
  } finally {
    await db.sequelize.close();
  }
}

test();
