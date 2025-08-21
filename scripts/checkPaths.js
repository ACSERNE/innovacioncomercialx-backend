const path = require('path');
const { resolvePathSafe } = require('./utils/pathUtils');

const baseDir = __dirname; // carpeta scripts/
const logFile = path.resolve(__dirname, '../../logs/path-check.log');

// Limpia el archivo log para que no acumule viejos logs
const fs = require('fs');
if (fs.existsSync(logFile)) {
  fs.unlinkSync(logFile);
}

const pathsToCheck = [
  '../config/config.js',
  '../models/database.js',
  '../models/index.js',
  '../seeders/20250619000000-demo-users.js'
];

console.log('📁 Validando rutas importantes...');
pathsToCheck.forEach(relativePath => {
  resolvePathSafe(baseDir, relativePath, logFile);
});

console.log(`✅ Validación completa. Revisa el log: ${logFile}`);

