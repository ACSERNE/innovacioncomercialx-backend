const db = require('../models');

module.exports = async () => {
  const transaccion = await db.Transaccion.findOne();
  const producto = await db.Producto.findOne();

  if (!transaccion || !producto) {
    console.log('⚠️ No hay datos suficientes para crear detalles');
    return;
  }

  await db.TransaccionDetalle.create({
    TransaccionId: transaccion.id,
    ProductoId: producto.id,
    cantidad: 2,
    precio: producto.precio
  });

  console.log('✅ Seeders: detalles creados');
};
