'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('flujos_caja', [
      {
        transaccionId: 1,
        tipo: 'ingreso',
        monto: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        transaccionId: 2,
        tipo: 'ingreso',
        monto: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('flujos_caja', null, {});
  }
};
