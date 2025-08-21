async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('➕ Agregando columna "tipo" a transacciones');
    await queryInterface.addColumn('transacciones', 'tipo', {
      type: Sequelize.STRING, // Puedes usar ENUM si quieres desde el principio
      allowNull: false,
      defaultValue: 'ingreso'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transacciones', 'tipo');
  }
};
}
main()
