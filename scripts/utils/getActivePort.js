const fs = require('fs');
const DEFAULT_PORT = 5001;

function getActivePort() {
  try {
    const port = fs.readFileSync('./server-port.txt', 'utf8');
    return parseInt(port, 10);
  } catch (err) {
    console.warn('⚠️ No se pudo leer el puerto desde archivo. Usando valor por defecto.');
    return DEFAULT_PORT;
  }
}

module.exports = getActivePort;
