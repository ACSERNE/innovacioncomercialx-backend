#!/usr/bin/env node
const inquirer = require('inquirer');
const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api'; // Ajusta según tu backend
let tokenSesion = null;

const opciones = [
  { name: '1) Buscar opción...', value: 'buscar' },
  { name: '2) Iniciar sesión', value: 'login' },
  { name: '3) Crear nuevo usuario', value: 'crear_usuario' },
  { name: '21) Salir del sistema', value: 'salir' },
];

async function mostrarMenu() {
  const { opcion } = await inquirer.prompt([{
    type: 'list',
    name: 'opcion',
    message: '===== COMERCIALX COCKPIT MENU =====',
    choices: opciones,
  }]);
  return opcion;
}

async function iniciarSesion() {
  const { correo, password } = await inquirer.prompt([
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' }
  ]);

  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { correo, password });
    tokenSesion = res.data.token;
    console.log('✅ Sesión iniciada correctamente');
  } catch (err) {
    console.log('❌ Error al iniciar sesión:', err.response?.data?.message || err.message);
  }
}

async function crearUsuario() {
  const { nombre, correo, password, role } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Nombre:' },
    { type: 'input', name: 'correo', message: 'Correo:' },
    { type: 'password', name: 'password', message: 'Contraseña:' },
    { type: 'list', name: 'role', message: 'Rol:', choices: ['admin', 'user'] },
  ]);

  try {
    const res = await axios.post(`${BASE_URL}/users`, { nombre, correo, password, role }, {
      headers: tokenSesion ? { Authorization: `Bearer ${tokenSesion}` } : {},
    });
    console.log('✅ Usuario creado:', res.data.nombre);
  } catch (err) {
    console.log('❌ Error al crear usuario:', err.response?.data?.message || err.message);
  }
}

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case 'login': await iniciarSesion(); break;
    case 'crear_usuario': await crearUsuario(); break;
    case 'salir': console.log('🚪 Saliendo...'); process.exit(0);
    default: console.log('❌ Opción inválida'); break;
  }
}

async function main() {
  while(true) {
    const opcion = await mostrarMenu();
    await ejecutarOpcion(opcion);
    await inquirer.prompt([{ type: 'input', name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  }
}

main();
