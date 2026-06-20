'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 'a2b3c4d5-e6f7-48ab-bcde-123456789abc', // mismo del token
      nombre: 'Admin Demo',
      correo: 'innovacioncomercialx@gmail.com',
      password: '123456', // suponiendo que luego se hashea
      role: 'admin',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      id: 'a2b3c4d5-e6f7-48ab-bcde-123456789abc'
    }, {});
  }
};
