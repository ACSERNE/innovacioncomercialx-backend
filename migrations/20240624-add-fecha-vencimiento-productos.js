'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar columna correcta a la tabla correcta (productos)
    await queryInterface.addColumn('productos', 'fecha_vencimiento', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir si es necesario
    await queryInterface.removeColumn('productos', 'fecha_vencimiento');
  }
};
