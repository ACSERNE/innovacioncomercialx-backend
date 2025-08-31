#!/usr/bin/env node
const inquirer = require('inquirer');
const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api'; // Ajusta al puerto de tu backend

async function iniciarSesion() {
  const datos = await inquirer.prompt([
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' }
  ]);

  try {
    const respuesta = await axios.post(`${BASE_URL}/auth/login`, datos);
    console.log('✅ Sesión iniciada correctamente!');
    console.log('Token JWT:', respuesta.data.token);
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error.response?.data || error.message);
  }
}

async function crearUsuario() {
  const datos = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nombre:' },
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' },
    { type: 'list', name: 'role', message: 'Rol:', choices: ['admin', 'user'] }
  ]);

  try {
    const respuesta = await axios.post(`${BASE_URL}/users`, datos);
    console.log('✅ Usuario creado correctamente!');
    console.log(respuesta.data);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error.response?.data || error.message);
  }
}

async function mainMenu() {
  while (true) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '===== COMERCIALX COCKPIT MENU =====',
        choices: [
          { name: '2) 🔄 Iniciar sesión', value: 'login' },
          { name: '3) 🧑‍💼 Crear nuevo usuario', value: 'crear_usuario' },
          { name: 'Salir', value: 'salir' }
        ]
      }
    ]);

    if (opcion === 'salir') {
      console.log('🚪 Saliendo del sistema...');
      process.exit(0);
    }

    switch (opcion) {
      case 'login': await iniciarSesion(); break;
      case 'crear_usuario': await crearUsuario(); break;
    }

    await inquirer.prompt([{ type: 'input', name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  }
}

mainMenu();
