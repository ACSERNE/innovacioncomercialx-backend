'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('productos');

    if (!table.descripcion) {
      await queryInterface.addColumn('productos', 'descripcion', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.precio_total) {
      await queryInterface.addColumn('productos', 'precio_total', {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
    }

    if (!table.descuento_aplicable) {
      await queryInterface.addColumn('productos', 'descuento_aplicable', {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
    }

    if (!table.fecha_vencimiento) {
      await queryInterface.addColumn('productos', 'fecha_vencimiento', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('productos', 'descripcion').catch(() => {});
    await queryInterface.removeColumn('productos', 'precio_total').catch(() => {});
    await queryInterface.removeColumn('productos', 'descuento_aplicable').catch(() => {});
    await queryInterface.removeColumn('productos', 'fecha_vencimiento').catch(() => {});
  }
};

