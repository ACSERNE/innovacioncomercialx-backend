async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seller_product', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      sellerId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('seller_product');
  },
};}
main()
