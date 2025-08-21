#!/usr/bin/env node
'use strict';

const path = require('path');
const { execSync } = require('child_process');

// Modulos cockpit
const { qaPaths } = require('./scripts/qa/qaPaths');
const chalk = require('chalk'); // Opcional para semáforo

const command = process.argv[2];

// 🧭 Cabecera visual
console.log(chalk.cyan.bold('\n🚀 CLI Cockpit - router-cli.js\n───────────────────────────────'));
console.log(`🔸 Comando recibido: ${command || 'none'}\n`);

try {
  switch (command) {
    case 'qa:paths':
      qaPaths();
      break;

    case 'db:migrate':
      console.log(chalk.yellow('⚙️ Ejecutando migraciones Sequelize...\n'));
      execSync('docker exec -it backend-innovacion npx sequelize-cli db:migrate --env docker', { stdio: 'inherit' });
      break;

    case 'db:seed:all':
      console.log(chalk.yellow('🌱 Ejecutando seeders...\n'));
      execSync('docker exec -it backend-innovacion npx sequelize-cli db:seed:all --env docker', { stdio: 'inherit' });
      break;

    case 'qa:precheck':
      console.log(chalk.magenta('\n🔍 Ejecutando validaciones estructurales previas...\n'));
      qaPaths();
      // Puedes agregar aquí otros prechecks: conexión DB, validez de .env, etc.
      break;

    case 'help':
    default:
      console.log(chalk.gray('📋 Comandos disponibles:\n'));
      console.log('  qa:paths      → Verifica rutas críticas del stack');
      console.log('  qa:precheck   → Corre validaciones cockpit previas');
      console.log('  db:migrate    → Ejecuta migraciones dentro del contenedor');
      console.log('  db:seed:all   → Ejecuta todos los seeders cockpit');
      console.log('  help          → Muestra este menú de comandos\n');
      break;
  }
} catch (error) {
  console.error(chalk.red('\n❌ Error inesperado en la ejecución CLI'));
  console.error(error.message);
}