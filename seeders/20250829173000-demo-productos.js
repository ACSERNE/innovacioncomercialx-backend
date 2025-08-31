'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('productos', [
      {
        nombre: 'Producto A',
        precio: 100.00,
        coste_mantenimiento: 10.00,
        coste_almacenamiento: 5.00,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Producto B',
        precio: 200.00,
        coste_mantenimiento: 15.00,
        coste_almacenamiento: 8.00,
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
