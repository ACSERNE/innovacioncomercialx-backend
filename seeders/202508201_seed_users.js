'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        nombre: 'Usuario Demo',
        correo: 'user@example.com',
        password: hashedPassword1,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nombre: 'Administrador',
        correo: 'admin@example.com',
        password: hashedPassword2,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
