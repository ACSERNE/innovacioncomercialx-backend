'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('productos', [
      {
        nombre: 'Laptop Dell',
        precio: 800.0,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Mouse Logitech',
        precio: 25.0,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
