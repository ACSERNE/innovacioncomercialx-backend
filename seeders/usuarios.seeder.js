const db = require('../models');

module.exports = async () => {
  const usuarios = [
    { nombre: 'Admin', correo: 'admin@demo.com', password: 'admin123', rol: 'admin' },
    { nombre: 'Vendedor 1', correo: 'vendedor1@demo.com', password: 'vendedor123', rol: 'user' },
    { nombre: 'Vendedor 2', correo: 'vendedor2@demo.com', password: 'vendedor123', rol: 'user' }
  ];

  for (const u of usuarios) {
    const existe = await db.Usuario.findOne({ where: { correo: u.correo } });
    if (!existe) {
      await db.Usuario.create(u);
    }
  }

  console.log('✅ Seeders: usuarios creados');
};
