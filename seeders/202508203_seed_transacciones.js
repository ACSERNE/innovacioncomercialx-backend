'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('transacciones', [
      {
        productoId: 1,
        userId: 1,
        cantidad: 2,
        total: 1600.0,
        metodo_pago: 'tarjeta',
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productoId: 2,
        userId: 2,
        cantidad: 3,
        total: 75.0,
        metodo_pago: 'efectivo',
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transacciones', null, {});
  }
};
