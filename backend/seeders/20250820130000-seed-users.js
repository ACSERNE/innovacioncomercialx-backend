'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        nombre: 'Admin',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Usuario Demo',
        password: await bcrypt.hash('user123', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
