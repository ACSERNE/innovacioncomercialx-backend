async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SeedLogs', [
      {
        ejecutadoPor: 'admin',
        tipo: 'migracion',
        resultado: 'éxito',
        comentario: 'Migración inicial aplicada correctamente',
        creadoEn: new Date('2025-07-01T10:00:00Z')
      },
      {
        ejecutadoPor: 'sistema',
        tipo: 'seed',
        resultado: 'éxito',
        comentario: 'Seed de datos ejecutado',
        creadoEn: new Date('2025-07-05T14:30:00Z')
      },
      {
        ejecutadoPor: 'usuario1',
        tipo: 'actualizacion',
        resultado: 'fallo',
        comentario: 'Error en actualización de producto',
        creadoEn: new Date('2025-07-10T08:15:00Z')
      },
      {
        ejecutadoPor: 'admin',
        tipo: 'migracion',
        resultado: 'éxito',
        comentario: 'Se agregó la columna ejecutadoPor',
        creadoEn: new Date('2025-07-14T09:00:00Z')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SeedLogs', null, {});
  }
};
}
main()
