#!/usr/bin/env node
const inquirer = require('inquirer');

const opciones = [
  { name: '2) Iniciar sesión', value: 'login' },
  { name: '3) Crear nuevo usuario', value: 'crear_usuario' },
];

async function mostrarMenu() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '===== COMERCIALX COCKPIT MENU =====',
      choices: opciones,
    },
  ]);
  return opcion;
}

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case 'login':
      console.log('🔄 Iniciar sesión seleccionado');
      break;
    case 'crear_usuario':
      console.log('🧑‍💼 Crear nuevo usuario seleccionado');
      break;
    default:
      console.log('❌ Opción inválida');
      break;
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
