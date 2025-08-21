async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('transacciones', 'metodo_pago', {
      type: Sequelize.ENUM('Tarjeta de crédito', 'Tarjeta de débito', 'Transferencia', 'Efectivo'),
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    // Si quieres revertir, por ejemplo a tipo string simple:
    await queryInterface.changeColumn('transacciones', 'metodo_pago', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
}
main()
