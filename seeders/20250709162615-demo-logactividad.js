async function main() {
'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const users = await queryInterface.sequelize.query(
      `SELECT id, correo FROM users WHERE role = 'user'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const logs = [];

    if (users.length) {
      logs.push({
        id: uuidv4(),
        userId: users[0].id,
        tipo: 'Inicio de sesión',
        descripcion: 'El usuario inició sesión correctamente.',
        ip: '192.168.0.101',
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      logs.push({
        id: uuidv4(),
        userId: users[0].id,
        tipo: 'Compra registrada',
        descripcion: 'Se registró compra de 2 unidades de Smartphone ZX Pro.',
        ip: '192.168.0.101',
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('logactividad', logs);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('logactividad', null, {});
  }
};}
main()
