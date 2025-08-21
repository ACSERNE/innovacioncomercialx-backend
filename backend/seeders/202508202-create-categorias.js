'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('categorias', null, {});
    await queryInterface.bulkInsert('categorias', [
      { nombre: 'Electrónica', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ropa', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Alimentos', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
