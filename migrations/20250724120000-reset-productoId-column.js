'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('ℹ️ [Migración] reset-productoId-column: no hay cambios por aplicar.');
    // Aquí puedes escribir lógica si necesitas hacer algo con productoId
  },

  async down(queryInterface, Sequelize) {
    console.log('↩️ [Reversión] reset-productoId-column: no hay cambios por revertir.');
    // Aquí puedes revertir los cambios si fuera necesario
  }
};
