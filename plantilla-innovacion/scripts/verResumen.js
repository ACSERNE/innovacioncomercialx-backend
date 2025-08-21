const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { Parser } = require('json2csv');

const logsDir = path.join(__dirname, '../logs');

// 🛡️ Verificar carpeta
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const csvFiles = fs.readdirSync(logsDir).filter(f => f.endsWith('.csv'));

if (csvFiles.length === 0) {
  console.log('📂 No se encontraron archivos CSV en logs/');
  process.exit(0);
}

let registros = [];
let pendientes = csvFiles.length;

csvFiles.forEach(file => {
  fs.createReadStream(path.join(logsDir, file))
    .pipe(csvParser())
    .on('data', row => {
      registros.push({ archivo: file, ...row });
    })
    .on('end', () => {
      pendientes--;
      if (pendientes === 0) {
        // 📊 Tabla de ejecuciones
        console.log(`\n📊 Resumen acumulado (${registros.length} ejecuciones):\n`);
        console.table(registros);

        // 🧮 Totales globales
        const totales = {
          usuariosInsertados: 0,
          usuariosDuplicados: 0,
          productosInsertados: 0,
          productosDuplicados: 0,
          productosOmitidos: 0,
          categoriasCreadas: 0
        };

        registros.forEach(reg => {
          Object.keys(totales).forEach(key => {
            const valor = parseInt(reg[key], 10);
            if (!isNaN(valor)) {
              totales[key] += valor;
            }
          });
        });

        console.log('\n📈 Totales globales:');
        Object.entries(totales).forEach(([campo, valor]) => {
          console.log(`🔹 ${campo}: ${valor}`);
        });

        // 💾 Exportar resumen global a CSV
        exportarTotalesCSV(totales);
      }
    });
});

// 📦 Exportación en archivo CSV con timestamp
function exportarTotalesCSV(totales) {
  const fecha = new Date();
  const fechaIso = fecha.toISOString().replace(/[:.]/g, '-');
  const fechaLegible = fecha.toLocaleString();
  const filePath = path.join(logsDir, `resumen-global-${fechaIso}.csv`);

  const data = {
    fecha: fechaLegible,
    ...totales
  };

  const parser = new Parser({ delimiter: ',' });
  const csv = parser.parse([data]);

  fs.writeFileSync(filePath, csv);
  console.log(`\n📄 Totales globales exportados en: ${filePath}`);
}