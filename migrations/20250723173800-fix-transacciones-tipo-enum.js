async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('🔧 Reestructurando columna "tipo" en transacciones');

    // Primero removemos la columna 'tipo' en minúsculas
    await queryInterface.removeColumn('transacciones', 'tipo');

    // Luego la agregamos como ENUM con los valores deseados
    await queryInterface.addColumn('transacciones', 'tipo', {
      type: Sequelize.ENUM('ingreso', 'egreso', 'venta', 'compra', 'devolucion'),
      allowNull: false,
    });

    console.log('✅ Columna "tipo" recreada como ENUM sincronizado');
  },

  async down(queryInterface, Sequelize) {
    console.log('🧹 Revirtiendo columna "tipo" a tipo STRING');

    await queryInterface.removeColumn('transacciones', 'tipo');

    await queryInterface.addColumn('transacciones', 'tipo', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    console.log('✅ Rollback completo: columna "tipo" revertida a STRING');
  }
};

}
main()
