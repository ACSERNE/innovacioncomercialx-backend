#!/usr/bin/env node

const inquirer = require('inquirer');

async function main() {
  console.clear();
  console.log("📌 Bienvenido al menú de InnovacionComercialX");

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Selecciona una acción:',
      choices: [
        '➕ Crear usuario',
        '📦 Crear producto',
        '💰 Registrar transacción',
        '📊 Generar reporte',
        '🚪 Salir'
      ]
    }
  ]);

  switch (option) {
    case '➕ Crear usuario':
      console.log("Aquí iría la lógica para crear un usuario...");
      break;
    case '📦 Crear producto':
      console.log("Aquí iría la lógica para crear un producto...");
      break;
    case '💰 Registrar transacción':
      console.log("Aquí iría la lógica para registrar una transacción...");
      break;
    case '📊 Generar reporte':
      console.log("Aquí iría la lógica para generar un reporte...");
      break;
    case '🚪 Salir':
      console.log("👋 Saliendo...");
      process.exit(0);
      break;
  }
}

main();
