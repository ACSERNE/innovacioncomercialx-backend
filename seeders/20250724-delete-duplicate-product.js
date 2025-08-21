async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('🧹 Eliminando producto duplicado...');
    await queryInterface.bulkDelete('productos', {
      id: 'f1a0a001-2b22-4c95-c002-222222222222'  // Cambia este ID si quieres borrar otro
    });
    console.log('✅ Producto duplicado eliminado.');
  },

  async down(queryInterface, Sequelize) {
    // Aquí podrías volver a insertar el producto si quieres, o dejar vacío
  }
};
}
main()
