const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');
const { Parser } = require('json2csv');

async function diagnosticarBase() {
  const queryInterface = sequelize.getQueryInterface();
  const tablasObjetivo = ['users', 'productos', 'categorias_producto', 'SeedLogs'];
  const existentes = await queryInterface.showAllTables();

  const diagnostico = [];

  for (const tabla of tablasObjetivo) {
    const existe = existentes.includes(tabla);
    let total = 0;

    if (existe) {
      const resultado = await sequelize.query(`SELECT COUNT(*) AS total FROM "${tabla}"`, {
        type: sequelize.QueryTypes.SELECT
      });
      total = parseInt(resultado[0].total);
    }

    diagnostico.push({
      tabla,
      existe: existe ? '✅' : '❌',
      registros: existe ? total : '-'
    });
  }

  console.log('\n📋 Estado de la base de datos:');
  console.table(diagnostico);
  exportarCSV(diagnostico);
}

function exportarCSV(data) {
  const fecha = new Date().toISOString().replace(/[:.]/g, '-');
  const ruta = path.join(__dirname, `../logs/diagnostico-base-${fecha}.csv`);
  const parser = new Parser({ delimiter: ',' });
  const csv = parser.parse(data);
  fs.writeFileSync(ruta, csv);
  console.log(`📄 Diagnóstico exportado a: ${ruta}`);
}

diagnosticarBase();
