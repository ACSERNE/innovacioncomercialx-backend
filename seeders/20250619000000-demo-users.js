async function main() {
'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {
  mostrarResumen,
  registrarLogEnDB
} = require('../scripts/utils/seedUtils');

module.exports = {
  async up(queryInterface) {
    // 🛡️ Borrar usuarios anteriores
    await queryInterface.bulkDelete('users', {
      correo: [
        'innovacioncomercialx@gmail.com',
        'user@example.com',
        'admin-token@example.com'
      ]
    });

    // 🔐 Hashear contraseñas
    const hashedPassword1 = await bcrypt.hash('admin1234', 10);
    const hashedPassword2 = await bcrypt.hash('user1234', 10);
    const hashedPassword3 = await bcrypt.hash('admin1234', 10);

    // 👤 Definir usuarios
    const usuarios = [
      {
        id: uuidv4(),
        nombre: 'Admin',
        correo: 'innovacioncomercialx@gmail.com',
        password: hashedPassword1,
        role: 'admin',
        activo: true,
        intentosFallidos: 0,
        bloqueadoHasta: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nombre: 'Usuario Demo',
        correo: 'user@example.com',
        password: hashedPassword2,
        role: 'user',
        activo: true,
        intentosFallidos: 0,
        bloqueadoHasta: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nombre: 'Admin Token',
        correo: 'admin-token@example.com',
        password: hashedPassword3,
        role: 'admin',
        activo: true,
        intentosFallidos: 0,
        bloqueadoHasta: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // 🧹 Insertar usuarios
    await queryInterface.bulkInsert('users', usuarios);

    // 📊 Generar resumen y log técnico
    const resumenTexto = mostrarResumen('DemoSeederUsuarios');
    await registrarLogEnDB(
      'SeederBatch',
      resumenTexto.trim(),
      'Carga de usuarios de prueba',
      'admin-token@example.com' // ejecutadoPor
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      correo: [
        'innovacioncomercialx@gmail.com',
        'user@example.com',
        'admin-token@example.com'
      ]
    });
  }
};

}
main()
