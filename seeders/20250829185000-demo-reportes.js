'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('reportes', [
      {
        fecha: new Date(),
        tipo: 'diario',
        total: 400.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fecha: new Date(),
        tipo: 'semanal',
        total: 1200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('reportes', null, {});
  }
};
