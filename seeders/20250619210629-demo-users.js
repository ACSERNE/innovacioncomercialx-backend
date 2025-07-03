'use strict';

const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Ajusta ruta si es necesario

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hasheamos las contraseñas primero
    const hashedPassword1 = await bcrypt.hash('admin1234', 10);
    const hashedPassword2 = await bcrypt.hash('user1234', 10);
    const hashedPassword3 = await bcrypt.hash('admin1234', 10);

    // Datos a insertar
    const users = [
      {
        id: 'd8db2f10-d778-41c7-b427-5734499240bc',
        nombre: 'Admin',
        correo: 'innovacioncomercialx@gmail.com',
        password: hashedPassword1,
        role: 'admin',
        activo: true,
      },
      {
        id: '7b91b15c-bbd8-4273-8c18-080997ead3e6',
        nombre: 'Usuario Demo',
        correo: 'user@example.com',
        password: hashedPassword2,
        role: 'user',
        activo: true,
      },
      {
        id: 'a2b3c4d5-e6f7-48ab-bcde-123456789abc',
        nombre: 'Admin Token',
        correo: 'admin-token@example.com',
        password: hashedPassword3,
        role: 'admin',
        activo: true,
      },
    ];

    // Insertamos o actualizamos cada usuario si no existe
    for (const userData of users) {
      await User.findOrCreate({
        where: { id: userData.id },
        defaults: {
          nombre: userData.nombre,
          correo: userData.correo,
          password: userData.password,
          role: userData.role,
          activo: userData.activo,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      correo: [
        'innovacioncomercialx@gmail.com',
        'user@example.com',
        'admin-token@example.com',
      ],
    });
  },
};
