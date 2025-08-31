'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('transacciones', [
      {
        productoId: 1,
        cantidad: 2,
        total: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productoId: 2,
        cantidad: 1,
        total: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transacciones', null, {});
  }
};
