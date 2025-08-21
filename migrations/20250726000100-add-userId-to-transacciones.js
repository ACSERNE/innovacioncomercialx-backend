async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('transacciones', 'productId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('transacciones', 'productId');
  }
};}
main()
