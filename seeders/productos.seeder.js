const db = require('../models');

module.exports = async () => {
  const productos = [
    {
      nombre: 'Lavado Premium',
      precio: 15000,
      stock: 10,
      fecha_vencimiento: '2026-12-31'
    },
    {
      nombre: 'Lavado Express',
      precio: 8000,
      stock: 20,
      fecha_vencimiento: '2026-10-15'
    },
    {
      nombre: 'Desinfección Interior',
      precio: 12000,
      stock: 5,
      fecha_vencimiento: '2026-08-01'
    }
  ];

  for (const p of productos) {
    const existe = await db.Producto.findOne({ where: { nombre: p.nombre } });
    if (!existe) await db.Producto.create(p);
  }

  console.log('✅ Seeders: productos creados');
};
