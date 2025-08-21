const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config.js')['development'];
const sequelize = new Sequelize(config);
const qi = sequelize.getQueryInterface();

const tabla = process.argv[2];
const columna = process.argv[3];
const tipo = process.argv[4] || 'STRING';

// 📅 Timestamp
const now = new Date();
const fecha = now.toISOString();
const logPath = path.resolve(__dirname, '../../logs/check-column.csv');
const color = (code, text) => `\x1b[${code}m${text}\x1b[0m`; // ANSI colors

console.log(color(36, '🚦 Auditoría estructural: check-or-create-column'));
console.log(color(90, `🕒 Fecha: ${fecha}`));
console.log(color(33, `📋 Tabla: ${tabla}`));
console.log(color(33, `📌 Columna: ${columna} (${tipo})`));
console.log('─'.repeat(60));

qi.describeTable(tabla)
  .then(table => {
    if (table[columna]) {
      console.log(color(32, `✅ La columna "${columna}" YA existe en "${tabla}"`));
      return 'ya-existe';
    } else {
      console.log(color(33, `🟡 La columna "${columna}" NO existe. Creando...`));
      return qi.addColumn(tabla, columna, { type: DataTypes[tipo] }).then(() => 'creada');
    }
  })
  .then(resultado => {
    // 📁 Logging CSV
    const fila = `"${fecha}","${tabla}","${columna}","${tipo}","${resultado}"\n`;
    fs.appendFileSync(logPath, fila);
    console.log(color(36, `📝 Log registrado en: logs/check-column.csv`));
  })
  .catch(err => console.error(color(31, '❌ Error en la operación:'), err))
  .finally(() => sequelize.close());
