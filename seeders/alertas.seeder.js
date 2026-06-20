const db = require('../models');

module.exports = async () => {
  const producto = await db.Producto.findOne();

  if (!producto) {
    console.log('⚠️ No hay productos para crear alertas');
    return;
  }

  await db.Alerta.create({
    tipo: 'stock_bajo',
    mensaje: `El producto ${producto.nombre} tiene stock bajo`,
    ProductoId: producto.id,
    leida: false
  });

  await db.Alerta.create({
    tipo: 'vencimiento',
    mensaje: `El producto ${producto.nombre} está próximo a vencer`,
    ProductoId: producto.id,
    leida: false
  });

  console.log('✅ Seeders: alertas creadas');
};
