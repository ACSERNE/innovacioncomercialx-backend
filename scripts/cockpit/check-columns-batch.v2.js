async function main() {
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config.js')['development'];
const sequelize = new Sequelize(config);
const qi = sequelize.getQueryInterface();

const inputCsv = process.argv[2];
const logPath = path.resolve(__dirname, '../../logs/check-column.csv');
const color = (code, text) => `\x1b[${code}m${text}\x1b[0m`;
const now = new Date().toISOString();

console.log(color(36, `🚦 Auditoría batch desde: ${inputCsv}`));
console.log(color(90, `🕒 Fecha: ${now}`));
console.log('─'.repeat(60));

const rl = readline.createInterface({
  input: fs.createReadStream(inputCsv),
  crlfDelay: Infinity,
});

let total = 0;
let creadas = 0;
let existentes = 0;

(async () => {
  for await (const line of rl) {
    if (line.startsWith('tabla')) continue;
    const [tabla, columna, tipo] = line.trim().split(',');

    try {
      const table = await qi.describeTable(tabla);
      if (table[columna]) {
        console.log(color(32, `✅ ${tabla}.${columna} ya existe (${tipo})`));
        existentes++;
        fs.appendFileSync(logPath, `"${now}","${tabla}","${columna}","${tipo}","ya-existe"\n`);
      } else {
        console.log(color(33, `🟡 ${tabla}.${columna} NO existe. Creando...`));
        await qi.addColumn(tabla, columna, { type: DataTypes[tipo] });
        console.log(color(36, `🛠️ ${columna} creada en ${tabla}`));
        creadas++;
        fs.appendFileSync(logPath, `"${now}","${tabla}","${columna}","${tipo}","creada"\n`);
      }
      total++;
    } catch (err) {
      console.error(color(31, `❌ Error en ${tabla}.${columna}:`), err.message);
    }
  }

  console.log('\n' + color(36, '📊 Auditoría finalizada'));
  console.log(color(90, `🔢 Total: ${total} columnas`));
  console.log(color(32, `✅ Existentes: ${existentes}`));
  console.log(color(33, `🛠️ Creadas: ${creadas}`));
  console.log(color(36, `📝 Log: logs/check-column.csv`));
  await sequelize.close();
})();
}
main()
