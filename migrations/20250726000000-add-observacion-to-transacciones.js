async function main() {
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si la columna 'observacion' existe en la tabla 'transacciones'
    const tableDesc = await queryInterface.describeTable('transacciones');
    if (!tableDesc.observacion) {
      await queryInterface.addColumn('transacciones', 'observacion', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface) => {
    // En caso de revertir, elimina la columna 'observacion'
    await queryInterface.removeColumn('transacciones', 'observacion');
  }
};
}
main()
