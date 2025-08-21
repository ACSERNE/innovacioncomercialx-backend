'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('reportes', null, {});
    await queryInterface.bulkInsert('reportes', [
      {
        tipo: 'diario',
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        total_ventas: 2475,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: 'semanal',
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        total_ventas: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('reportes', null, {});
  }
};
