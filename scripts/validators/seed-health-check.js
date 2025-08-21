async function main() {
'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('../../config/config.js')['development'];

const logPath = path.resolve(__dirname, '../../logs/seed-health-check-' + new Date().toISOString().replace(/:/g, '-') + '.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

const log = (msg) => {
  console.log(msg);
  logStream.write(`[${new Date().toISOString()}] ${msg}\n`);
};

(async () => {
  const sequelize = new Sequelize(dbConfig);

  try {
    log('🔎 Iniciando auditoría estructural previa a semillas...');

    // 1. Validar estructura crítica de tabla Transacciones
    const [columns] = await sequelize.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'Transacciones';
    `);

    const requiredColumns = ['tipo', 'monto', 'fecha'];
    const actualColumns = columns.map(c => c.column_name);
    const missingColumns = requiredColumns.filter(col => !actualColumns.includes(col));

    if (missingColumns.length > 0) {
      log(`⛔ Faltan columnas en Transacciones: ${missingColumns.join(', ')}`);
    } else {
      log('✅ Transacciones: estructura OK');
    }

    // 2. Validar existencia de valores ENUM
    const [enumResult] = await sequelize.query(`
      SELECT unnest(enum_range(NULL::enum_transacciones_tipo)) AS value;
    `);

    const expectedEnum = ['compra', 'venta', 'devolucion'];
    const actualEnum = enumResult.map(e => e.value);
    const missingEnum = expectedEnum.filter(val => !actualEnum.includes(val));

    if (missingEnum.length > 0) {
      log(`⛔ ENUM 'enum_transacciones_tipo' incompleto. Faltan: ${missingEnum.join(', ')}`);
    } else {
      log('✅ ENUM completo: compra, venta, devolucion');
    }

    // 3. Verificar existencia de datos en seeds demo
    const seedPath = path.resolve(__dirname, '../../seeders/demo-transacciones.js');
    const content = fs.existsSync(seedPath) ? fs.readFileSync(seedPath, 'utf-8') : null;

    if (content && content.includes('bulkInsert') && content.match(/\{[^}]*tipo[^}]*\}/)) {
      log('📦 Seed de transacciones contiene datos con campo "tipo"');
    } else {
      log('⚠️ Seed demo-transacciones.js no contiene datos reconocibles. Revisar contenido.');
    }

    log('📁 Auditoría finalizada. Log guardado en: ' + logPath);
    process.exit(0);

  } catch (err) {
    log('⛔ Error técnico en auditoría: ' + err.message);
    process.exit(1);
  } finally {
    await sequelize.close();
    logStream.end();
  }
})();}
main()
