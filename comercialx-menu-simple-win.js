#!/usr/bin/env node
const inquirer = require('inquirer');

const opciones = [
  { name: '2) Iniciar sesión', value: 'login' },
  { name: '3) Crear nuevo usuario', value: 'crear_usuario' },
];

async function mostrarMenuFiltrado() {
  const { filtro } = await inquirer.prompt([
    {
      type: 'input',
      name: 'filtro',
      message: 'Filtra menú por palabra clave (ENTER para ver todo):',
    },
  ]);

  let opcionesFiltradas = opciones;
  if (filtro) {
    opcionesFiltradas = opciones.filter(o =>
      o.name.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '===== COMERCIALX COCKPIT MENU =====',
      choices: opcionesFiltradas,
    },
  ]);

  return opcion;
}

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case 'login': console.log('[LOGIN] Iniciar sesión seleccionado'); break;
    case 'crear_usuario': console.log('[USER] Crear nuevo usuario seleccionado'); break;
    default: console.log('Opción inválida'); break;
  }
}

async function main() {
  while(true) {
    const opcion = await mostrarMenuFiltrado();
    await ejecutarOpcion(opcion);
    await inquirer.prompt([{ type: 'input', name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  }
}

main();
