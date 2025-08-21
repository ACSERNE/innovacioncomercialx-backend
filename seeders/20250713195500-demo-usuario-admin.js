async function main() {
'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        nombre: 'Administrador',
        correo: 'admin-token@example.com',
        password: 'hashed_password_aqui', // Reemplaza por un hash real si usas passwords seguros
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { correo: 'admin-token@example.com' });
  }
};
}
main()
