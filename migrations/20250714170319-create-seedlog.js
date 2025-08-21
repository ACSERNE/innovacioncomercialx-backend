async function main() {
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeedLogs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resultado: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      comentario: {
        type: Sequelize.TEXT
      },
      creadoEn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('SeedLogs');
  }
};}
main()
