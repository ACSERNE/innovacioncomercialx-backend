async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('📥 [Migración] Agregando columna "monto" a transacciones');

    await queryInterface.addColumn('transacciones', 'monto', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });

    console.log('✅ Columna "monto" agregada correctamente');
  },

  async down(queryInterface, Sequelize) {
    console.log('↩️ [Migración] Eliminando columna "monto" de transacciones');

    await queryInterface.removeColumn('transacciones', 'monto');

    console.log('✅ Columna "monto" eliminada correctamente');
  },
};
}
main()
