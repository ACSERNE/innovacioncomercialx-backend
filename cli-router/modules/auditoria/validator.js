// ┌────────────────────────────────────────────┐
// │  VALDEZ · SEED STRUCTURE VALIDATOR         │
// └────────────────────────────────────────────┘

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const csvWriter = require('csv-writer'); // si decides exportar auditoría
const { Client } = require('pg'); // asumiendo PostgreSQL

async function validateSeedStructure(seedPath) {
  console.log(chalk.cyan(`\n🔍 Seed validator en acción para:\n📄 ${seedPath}\n`));

  if (!fs.existsSync(seedPath)) {
    console.log(chalk.red(`❌ Archivo no encontrado: ${seedPath}`));
    return;
  }

  const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  const rows = Array.isArray(seedData) ? seedData : [seedData];

  console.log(chalk.green(`✅ ${rows.length} registros detectados.`));

  // 🔎 Validar estructura básica (ejemplo)
  const requiredKeys = ['id', 'nombre', 'fecha_creacion'];
  const missingKeys = new Set();

  rows.forEach((row, index) => {
    requiredKeys.forEach((key) => {
      if (!row.hasOwnProperty(key)) {
        missingKeys.add(key);
        console.log(chalk.yellow(`⚠️ Registro ${index + 1} sin '${key}'`));
      }
    });
  });

  // 📦 Log CSV (opcional)
  if (missingKeys.size > 0) {
    const logFile = `logs/seed-audit-${Date.now()}.csv`;
    const writer = csvWriter.createObjectCsvWriter({
      path: logFile,
      header: requiredKeys.map(k => ({ id: k, title: k.toUpperCase() }))
    });
    await writer.writeRecords(rows);
    console.log(chalk.blueBright(`📄 Exportación CSV: ${logFile}`));
  }

  console.log(chalk.greenBright(`\n🧮 Validación completada.\n`));
}

module.exports = { validateSeedStructure };