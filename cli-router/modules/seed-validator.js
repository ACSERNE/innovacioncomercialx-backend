// ┌────────────────────────────────────────────┐
// │    VALDEZ · SEED STRUCTURE VALIDATOR       │
// └────────────────────────────────────────────┘

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const requiredKeys = ['id', 'nombre', 'fecha_creacion']; // ajusta según tus seeds

async function validateSeedStructure(seedPath) {
  console.log(chalk.cyan(`\n🔍 VALIDACIÓN SEED STRUCTURE\n📄 Archivo: ${seedPath}\n`));

  if (!fs.existsSync(seedPath)) {
    console.log(chalk.red(`❌ Archivo no encontrado.`));
    return;
  }

  const content = fs.readFileSync(seedPath, 'utf8');
  let seed;

  try {
    seed = JSON.parse(content);
  } catch (err) {
    console.log(chalk.red(`❌ JSON inválido: ${err.message}`));
    return;
  }

  const rows = Array.isArray(seed) ? seed : [seed];
  console.log(chalk.green(`✅ ${rows.length} registros detectados.`));

  let warnings = 0;

  rows.forEach((row, i) => {
    requiredKeys.forEach((key) => {
      if (!row.hasOwnProperty(key)) {
        warnings++;
        console.log(chalk.yellow(`⚠️ Registro ${i + 1} sin '${key}'`));
      }
    });
  });

  if (warnings === 0) {
    console.log(chalk.greenBright(`\n🎉 Todos los registros cumplen con la estructura esperada.\n`));
  } else {
    console.log(chalk.magenta(`\n🔎 ${warnings} advertencias encontradas.\n`));
  }
}

module.exports = { validateSeedStructure };