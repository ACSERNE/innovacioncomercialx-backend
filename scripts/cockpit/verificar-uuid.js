// scripts/cockpit/check-column.js
const { Sequelize } = require('sequelize');
const config = require('../../config/config.js')['development'];
const sequelize = new Sequelize(config);
sequelize.queryInterface = sequelize.getQueryInterface();

const tabla = process.argv[2];
const columna = process.argv[3];

sequelize.queryInterface.describeTable(tabla)
  .then(table => {
    if (table[columna]) {
      console.log(`🟢 La columna "${columna}" existe en "${tabla}"`);
    } else {
      console.log(`🔴 La columna "${columna}" NO existe en "${tabla}"`);
    }
  })
  .catch(err => console.error('⚠️ Error al describir la tabla:', err))
  .finally(() => sequelize.close());
