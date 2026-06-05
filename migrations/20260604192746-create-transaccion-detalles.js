'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransaccionDetalles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      productoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'productos', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      transaccionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Transaccions', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio_unitario: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('TransaccionDetalles');
  }
};

