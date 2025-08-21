const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');
const { Parser } = require('json2csv');

async function verLogsPorUsuario() {
  try {
    const registros = await sequelize.query(
      `SELECT "ejecutadoPor", "tipo", "comentario", "creadoEn" FROM "SeedLogs" ORDER BY "creadoEn" DESC`,
      { type: sequelize.QueryTypes.SELECT }
    );

    if (!registros.length) {
      console.log('📂 No hay logs técnicos en la tabla SeedLogs');
      return;
    }

    // 📊 Mostrar registros en consola
    console.log(`\n📋 Logs técnicos (${registros.length} registros):`);
    console.table(registros);

    // 🧮 Conteo por usuario
    const conteo = {};
    registros.forEach(log => {
      const key = log.ejecutadoPor || 'desconocido';
      conteo[key] = (conteo[key] || 0) + 1;
    });

    const resumenPorUsuario = Object.entries(conteo).map(([usuario, total]) => ({
      usuario,
      totalOperaciones: total
    }));

    console.log('\n📈 Totales por usuario:');
    console.table(resumenPorUsuario);

    // 💾 Exportar a CSV
    exportarCSV(resumenPorUsuario);
  } catch (err) {
    console.error('❌ Error al consultar logs:', err);
  }
}

function exportarCSV(data) {
  const fechaIso = new Date().toISOString().replace(/[:.]/g, '-');
  const ruta = path.join(__dirname, '../logs/resumen-por-usuario-' + fechaIso + '.csv');

  const parser = new Parser({ delimiter: ',' });
  const csv = parser.parse(data);
  fs.writeFileSync(ruta, csv);
  console.log(`📄 Exportación CSV: ${ruta}`);
}

verLogsPorUsuario();
