const db = require('../models');

module.exports = async () => {
  const categorias = [
    { nombre: 'Lavados' },
    { nombre: 'Desinfección' },
    { nombre: 'Servicios Premium' }
  ];

  for (const c of categorias) {
    const existe = await db.Categoria.findOne({ where: { nombre: c.nombre } });
    if (!existe) await db.Categoria.create(c);
  }

  console.log('✅ Seeders: categorías creadas');
};
