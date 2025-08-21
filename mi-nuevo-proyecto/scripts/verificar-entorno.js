const fs = require('fs');
const path = require('path');

const variablesObligatorias = [
  'DB_HOST',
  'DB_NAME',
  'DB_USER',
  'DB_PASS',
  'PORT'
];

const dotenvPath = path.join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`);

if (!fs.existsSync(dotenvPath)) {
  console.log(`❌ No se encontró el archivo ${dotenvPath}`);
  process.exit(1);
}

require('dotenv').config({ path: dotenvPath });

console.log(`\n🔍 Verificando variables del entorno (${dotenvPath})...\n`);

let errores = 0;

variablesObligatorias.forEach(variable => {
  if (!process.env[variable] || process.env[variable].trim() === '') {
    console.log(`❌ Faltante: ${variable}`);
    errores++;
  } else {
    console.log(`✅ ${variable} = ${process.env[variable]}`);
  }
});

if (errores === 0) {
  console.log(`\n🎉 Todas las variables están definidas correctamente.\n`);
} else {
  console.log(`\n⚠️ Se encontraron ${errores} variable(s) faltante(s). Revisa tu archivo .env.\n`);
  process.exit(1);
}