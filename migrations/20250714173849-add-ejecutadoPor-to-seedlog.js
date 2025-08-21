async function main() {
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('SeedLogs');

    if (!table.ejecutadoPor) {
      await queryInterface.addColumn('SeedLogs', 'ejecutadoPor', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'sistema',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('SeedLogs');

    if (table.ejecutadoPor) {
      await queryInterface.removeColumn('SeedLogs', 'ejecutadoPor');
    }
  },
};
}
main()
