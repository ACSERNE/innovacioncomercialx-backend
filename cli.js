#!/usr/bin/env node

const inquirer = require('inquirer');

async function main() {
  console.log("🚀 Bienvenido al asistente de Innovación ComercialX");

  const respuestas = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: '¿Qué deseas hacer?',
      choices: [
        { name: '📦 Gestionar productos', value: 'productos' },
        { name: '👤 Gestionar usuarios', value: 'usuarios' },
        { name: '💰 Revisar flujo de caja', value: 'caja' },
        { name: '📊 Generar reportes', value: 'reportes' },
        { name: '❌ Salir', value: 'salir' }
      ]
    }
  ]);

  switch (respuestas.accion) {
    case 'productos':
      console.log("🔹 Módulo de productos en construcción...");
      break;
    case 'usuarios':
      console.log("🔹 Módulo de usuarios en construcción...");
      break;
    case 'caja':
      console.log("🔹 Mostrando flujo de caja...");
      break;
    case 'reportes':
      console.log("🔹 Generando reportes...");
      break;
    case 'salir':
      console.log("👋 Saliendo del asistente...");
      process.exit(0);
  }
}

main();
