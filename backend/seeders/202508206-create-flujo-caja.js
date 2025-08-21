'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('flujos_caja', null, {});
    await queryInterface.bulkInsert('flujos_caja', [
      {
        monto: 5000,
        tipo: 'entrada',
        descripcion: 'Venta de productos',
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        monto: 2000,
        tipo: 'salida',
        descripcion: 'Compra de inventario',
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('flujos_caja', null, {});
  }
};
