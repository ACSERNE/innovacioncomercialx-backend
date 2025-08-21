async function main() {
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('productos', 'descripcion', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('productos', 'descripcion');
  },
};}
main()
