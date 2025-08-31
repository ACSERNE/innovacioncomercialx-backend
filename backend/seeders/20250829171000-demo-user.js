'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
      nombre: 'Usuario Demo',
      correo: 'demo@comercialx.com',
      password: bcrypt.hashSync('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
