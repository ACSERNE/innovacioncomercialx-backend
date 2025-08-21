async function main() {
'use strict';

const { Sequelize } = require('sequelize');
const dbConfig = require('../../config/config.js')['development'];
const expectedEnumValues = ['compra', 'venta', 'devolucion'];

(async () => {
  const sequelize = new Sequelize(dbConfig);

  try {
    const [results] = await sequelize.query(`
      SELECT column_name, udt_name
      FROM information_schema.columns
      WHERE table_name = 'Transacciones' AND column_name = 'tipo';
    `);

    if (results.length === 0) {
      throw new Error('❌ Columna "tipo" no existe en la tabla Transacciones');
    }

    const column = results[0];
    const enumType = column.udt_name;

    const [enumCheck] = await sequelize.query(`SELECT unnest(enum_range(NULL::${enumType})) AS value;`);
    const actualValues = enumCheck.map(row => row.value);
    const missing = expectedEnumValues.filter(v => !actualValues.includes(v));

    if (missing.length > 0) {
      throw new Error(`❌ Valores faltantes en ENUM: ${missing.join(', ')}`);
    }

    console.log('✅ Validación exitosa: columna "tipo" existe con ENUM correcto');
    process.exit(0);
  } catch (err) {
    console.error(`[VALIDADOR] Error: ${err.message}`);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();}
main()
