'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('productos', [
      { nombre: 'Producto A', precio: 1000, stock: 10, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Producto B', precio: 2000, stock: 5, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Producto C', precio: 3000, stock: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
