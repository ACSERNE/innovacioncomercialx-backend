async function main() {
'use strict';
const readline = require('readline');
const realizarCompra = require('./realizarCompra');
const db = require('../models'); // ajusta si tu carpeta es diferente

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  try {
    const users = await db.User.findAll({ where: { role: 'user' } });
    const productos = await db.Producto.findAll();

    if (!users.length || !productos.length) {
      console.log('No hay usuarios o productos disponibles.');
      rl.close();
      return;
    }

    console.log('\n📋 Usuarios disponibles:');
    users.forEach((u, i) => {
      console.log(`${i + 1}. ${u.nombre} (${u.id})`);
    });

    rl.question('\nSeleccione número de usuario: ', (userIndexRaw) => {
      const userIndex = parseInt(userIndexRaw) - 1;
      const userId = users[userIndex]?.id;

      if (!userId) {
        console.log('❌ Usuario inválido.');
        rl.close();
        return;
      }

      console.log('\n📦 Productos disponibles:');
      productos.forEach((p, i) => {
        console.log(`${i + 1}. ${p.nombre} | Stock: ${p.stock} | Precio: ${p.precio_unitario}`);
      });

      rl.question('\nSeleccione número de producto: ', (prodIndexRaw) => {
        const prodIndex = parseInt(prodIndexRaw) - 1;
        const product = productos[prodIndex];

        if (!product) {
          console.log('❌ Producto inválido.');
          rl.close();
          return;
        }

        rl.question(`\nIngrese cantidad a comprar (stock disponible: ${product.stock}): `, async (cantidadRaw) => {
          const cantidad = parseInt(cantidadRaw);

          if (isNaN(cantidad) || cantidad < 1 || cantidad > product.stock) {
            console.log('❌ Cantidad inválida.');
            rl.close();
            return;
          }

          const resultado = await realizarCompra(userId, product.id, cantidad);
          console.log('\n🧾 Resultado de la compra:\n', JSON.stringify(resultado, null, 2));
          rl.close();
        });
      });
    });
  } catch (error) {
    console.error('⚠️ Error inesperado:', error.message);
    rl.close();
  }
})();}
main()
