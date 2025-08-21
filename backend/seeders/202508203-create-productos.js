'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('productos', null, {});
    await queryInterface.bulkInsert('productos', [
      {
        nombre: 'Laptop',
        precio: 1200,
        stock: 10,
        categoriaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Camiseta',
        precio: 25,
        stock: 50,
        categoriaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Galletas',
        precio: 5,
        stock: 200,
        categoriaId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
