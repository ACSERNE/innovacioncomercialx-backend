async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Solo intentamos eliminar si existe la columna
    const table = await queryInterface.describeTable('transacciones');

    if (table.productoId) {
      await queryInterface.removeColumn('transacciones', 'productoId');
      console.log('🗑️ Columna productoId eliminada');
    } else {
      console.log('⚠️ La columna productoId no existe, se omitirá la eliminación');
    }

    await queryInterface.addColumn('transacciones', 'productoId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    console.log('✅ Columna productoId agregada como UUID nullable con FK a productos');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transacciones', 'productoId');

    await queryInterface.addColumn('transacciones', 'productoId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    console.log('↩️ Migración revertida: columna productoId restablecida');
  }
};
}
main()
