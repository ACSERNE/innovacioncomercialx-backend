async function main() {
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('admin1234', 10);
    return queryInterface.bulkInsert('users', [{
      id: Sequelize.literal('uuid_generate_v4()'),
      nombre: 'Admin',
      correo: 'admin@correo.com',
      password: passwordHash,
      role: 'admin',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', { correo: 'admin@correo.com' });
  }
};
}
main()
