'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        nombre: 'Admin',
        correo: 'admin@demo.com',
        password: await bcrypt.hash('123456', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Usuario',
        correo: 'usuario@demo.com',
        password: await bcrypt.hash('123456', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
