async function main() {
'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Eliminamos vínculos existentes
    await queryInterface.bulkDelete('seller_product', null, {});

    // Obtenemos IDs de productos insertados
    const productos = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM productos`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Vendedor demo (puedes usar un usuario real si ya está creado)
    const vendedorId = uuidv4();

    // Insertamos el vendedor si no está en tu tabla `users`
    await queryInterface.bulkInsert('users', [
      {
        id: vendedorId,
        nombre: 'Vendedor Demo',
        correo: 'seller@example.com',
        password: '$2a$10$demoEncryptHashDeContraseña', // opcional: cambia por bcrypt real
        role: 'seller',
        activo: true,
        intentosFallidos: 0,
        bloqueadoHasta: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Creamos relaciones con los productos existentes
    const sellerProducts = productos.map(prod => ({
      id: uuidv4(),
      sellerId: vendedorId,
      productId: prod.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('seller_product', sellerProducts);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('seller_product', null, {});
    await queryInterface.bulkDelete('users', { correo: 'seller@example.com' });
  },
};}
main()
