'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('alertas', [
      {
        productoId: 1,
        tipo: 'stock_bajo',
        mensaje: 'Stock bajo del Producto A',
        estado: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productoId: 2,
        tipo: 'vencimiento',
        mensaje: 'Producto B próximo a vencer',
        estado: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('alertas', null, {});
  }
};
