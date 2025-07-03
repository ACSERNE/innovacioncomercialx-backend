'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categorias_producto', [
      {
        id: 'a1b2c3d4-1111-2222-3333-444455556666',
        nombre: 'Alimentos',
        descripcion: 'Productos alimenticios básicos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b2c3d4e5-2222-3333-4444-555566667777',
        nombre: 'Bebidas',
        descripcion: 'Jugos, refrescos y bebidas naturales',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categorias_producto', null, {});
  }
};
