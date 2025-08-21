'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('reportes', [
      {
        tipo: 'diario',
        fecha_inicio: new Date('2025-08-19'),
        fecha_fin: new Date('2025-08-19'),
        total_ventas: 1675.0,
        promedio_ventas: 837.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: 'semanal',
        fecha_inicio: new Date('2025-08-14'),
        fecha_fin: new Date('2025-08-20'),
        total_ventas: 5000.0,
        promedio_ventas: 1000.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('reportes', null, {});
  }
};
