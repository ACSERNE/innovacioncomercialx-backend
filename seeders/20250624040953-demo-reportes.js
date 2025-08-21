async function main() {
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('reportes', [
      {
        id: 'f1a0a001-2b22-4c95-c002-222222222222',
        tipo: 'diario',
        fecha: '2025-06-23',
        resumen: JSON.stringify({ totalEntradas: 100, totalSalidas: 50 }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'f1a0a002-2b22-4c95-c002-222222222223',
        tipo: 'mensual',
        fecha: '2025-06-01',
        resumen: JSON.stringify({ totalEntradas: 800, totalSalidas: 600 }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('reportes', null, {});
  }
};

}
main()
