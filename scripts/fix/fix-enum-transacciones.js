async function main() {
'use strict';

const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const dbConfig = require('../../config/config.js')['development'];
const expectedValues = ['ingreso', 'egreso', 'compra', 'venta', 'devolucion'];

const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/:/g, '-');
const logPath = path.resolve(logDir, `fix-enum-transacciones-${timestamp}.log`);
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

const log = (message) => {
  console.log(message);
  logStream.write(`[${new Date().toISOString()}] ${message}\n`);
};

(async () => {
  const sequelize = new Sequelize(dbConfig);

  try {
    log('🔧 Iniciando reparación de ENUM "enum_transacciones_tipo"...');

    // Detectar nombre real del ENUM desde la tabla
    const [colResult] = await sequelize.query(`
      SELECT udt_name
      FROM information_schema.columns
      WHERE table_name = 'Transacciones' AND column_name = 'tipo';
    `);

    if (colResult.length === 0) {
      log('⛔ Error: columna "tipo" no existe en la tabla Transacciones.');
      process.exit(1);
    }

    const enumName = colResult[0].udt_name;
    log(`🔎 Tipo ENUM detectado: ${enumName}`);

    // Obtener los valores actuales del ENUM
    const [enumResult] = await sequelize.query(`
      SELECT unnest(enum_range(NULL::${enumName})) AS value;
    `);

    const actualValues = enumResult.map(row => row.value);
    const missing = expectedValues.filter(v => !actualValues.includes(v));

    if (missing.length === 0) {
      log('✅ No hay valores faltantes en el ENUM. Estructura completa.');
      process.exit(0);
    }

    // Agregar valores faltantes
    for (const value of missing) {
      log(`⚠️ Agregando valor faltante: '${value}'...`);
      await sequelize.query(`
        ALTER TYPE ${enumName} ADD VALUE IF NOT EXISTS '${value}';
      `);
      log(`✅ Valor '${value}' agregado exitosamente.`);
    }

    log('🟢 Reparación completada. Todos los valores requeridos están presentes.');
    process.exit(0);

  } catch (error) {
    log(`⛔ Error en la reparación: ${error.message}`);
    process.exit(1);
  } finally {
    await sequelize.close();
    logStream.end();
  }
})();}
main()
