'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
  }
};
module.exports = {
  up: async (queryInterface, Sequelize) => { /* ... */ },
  down: async (queryInterface, Sequelize) => { /* ... */ },
};
