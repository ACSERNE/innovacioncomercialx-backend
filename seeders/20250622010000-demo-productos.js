'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('productos', [
      {
        id: 'c3d4e5f6-aaaa-bbbb-cccc-ddddeeeeffff',
        nombre: 'Arroz 1kg',
        precio_unitario: 1000.0,
        precio_total: 1000.0,
        descuento_aplicable: false,
        stock: 25,
        categoriaId: 'a1b2c3d4-1111-2222-3333-444455556666',
        fecha_vencimiento: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd4e5f6a7-bbbb-cccc-dddd-eeeeffff0000',
        nombre: 'Jugo Natural 1L',
        precio_unitario: 1500.0,
        precio_total: 1350.0,
        descuento_aplicable: true,
        stock: 15,
        categoriaId: 'b2c3d4e5-2222-3333-4444-555566667777',
        fecha_vencimiento: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
