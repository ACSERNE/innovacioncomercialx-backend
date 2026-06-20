'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sellerProductId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SellerProducts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      precio_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comision_valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      monto_vendedor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fecha_venta: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Sales');
  },
};
