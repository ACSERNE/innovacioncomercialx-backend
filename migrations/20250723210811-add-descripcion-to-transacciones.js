async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('📥 [Migración] Agregando columna "descripcion" a transacciones');

    await queryInterface.addColumn('transacciones', 'descripcion', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

    console.log('✅ Columna "descripcion" agregada correctamente');
  },

  async down(queryInterface, Sequelize) {
    console.log('🧹 [Rollback] Eliminando columna "descripcion" de transacciones');

    await queryInterface.removeColumn('transacciones', 'descripcion');

    console.log('✅ Rollback completo: columna "descripcion" eliminada');
  }
};
}
main()
