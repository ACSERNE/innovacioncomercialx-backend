const db = require('../models');

module.exports = async () => {
  const usuario = await db.Usuario.findOne();
  const producto1 = await db.Producto.findOne();
  const producto2 = await db.Producto.findOne({ offset: 1 });

  if (!usuario || !producto1 || !producto2) {
    console.log('⚠️ No hay datos suficientes para crear transacciones');
    return;
  }

  const venta = await db.Transaccion.create({
    UsuarioId: usuario.id,
    total: producto1.precio + producto2.precio
  });

  await db.TransaccionDetalle.create({
    TransaccionId: venta.id,
    ProductoId: producto1.id,
    cantidad: 1,
    precio: producto1.precio
  });

  await db.TransaccionDetalle.create({
    TransaccionId: venta.id,
    ProductoId: producto2.id,
    cantidad: 1,
    precio: producto2.precio
  });

  console.log('✅ Seeders: transacciones creadas');
};
