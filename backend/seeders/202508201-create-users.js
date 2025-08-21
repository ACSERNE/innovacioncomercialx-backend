'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        nombre: 'Admin',
        correo: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nombre: 'Usuario',
        correo: 'user@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
