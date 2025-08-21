async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('📦 Eliminando columna "productoId" si ya existe...');

    try {
      await queryInterface.removeColumn('transacciones', 'productoId');
    } catch (error) {
      console.warn('⚠️ No se pudo eliminar "productoId" (puede que no exista):', error.message);
    }

    console.log('➕ Agregando columna "productoId" como UUID...');

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

    console.log('✅ Columna "productoId" agregada correctamente con tipo UUID');
  },

  async down(queryInterface, Sequelize) {
    console.log('🗑 Eliminando columna "productoId"...');
    await queryInterface.removeColumn('transacciones', 'productoId');
    console.log('✅ Columna "productoId" eliminada');
  }
};
}
main()
