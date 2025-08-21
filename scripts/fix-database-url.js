#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envFilePath = path.resolve(__dirname, '../.env');
const isDocker = process.env.IS_DOCKER === 'true' || process.env.DOCKER === 'true';

const envVars = fs.readFileSync(envFilePath, 'utf8');
const databaseUrlLine = envVars.split('\n').find(line => line.startsWith('DATABASE_URL='));

if (!databaseUrlLine) {
  console.error('❌ No se encontró DATABASE_URL en el archivo .env');
  process.exit(1);
}

const currentUrl = databaseUrlLine.split('=')[1].trim();
const expectedHost = isDocker ? 'postgres' : 'localhost';
const updatedUrl = currentUrl.replace(/@(.*?):/, `@${expectedHost}:`);

console.log('🧪 Validación y corrección de DATABASE_URL');
console.log(`Modo Docker: ${isDocker}`);
console.log(`Actual (.env):       ${currentUrl}`);
console.log(`Reconstruida manual: ${updatedUrl}`);

if (currentUrl !== updatedUrl) {
  const updatedEnv = envVars.replace(currentUrl, updatedUrl);
  fs.writeFileSync(envFilePath, updatedEnv, 'utf8');
  console.log('✅ DATABASE_URL fue corregida y el archivo .env actualizado.');
} else {
  console.log('✅ DATABASE_URL ya está correcta. No se modificó .env.');
}
