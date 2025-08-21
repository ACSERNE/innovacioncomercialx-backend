async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productos', [
      {
        nombre: 'Smartphone',
        precio_unitario: 300,
        stock: 25,
        categoriaId: 'baf09587-e18d-4a09-9fe9-7f6fdbdc22b0', // Electrónica
        fecha_vencimiento: null,  // No aplica
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Chocolate',
        precio_unitario: 2,
        stock: 50,
        categoriaId: 'a9a33cbf-9b2a-4dfe-8bde-123456789abc', // Alimentos
        fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 días para vencer
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
}
main()
