const fs = require('fs');
const path = require('path');

function convertirMetaCSV() {
  const rutaCSV = path.join(__dirname, '../logs/applied-meta.csv');
  const rutaJSON = path.join(__dirname, '../logs/applied-meta.json');

  try {
    const contenido = fs.readFileSync(rutaCSV, 'utf8');
    const lista = contenido
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length);

    fs.writeFileSync(rutaJSON, JSON.stringify(lista, null, 2));
    console.log(`✅ Conversión realizada: ${rutaJSON}`);
  } catch (err) {
    console.error('❌ Error al convertir CSV a JSON:', err.message);
  }
}

convertirMetaCSV();