const fs = require('fs');
const path = require('path');

const readmePath = path.resolve('./README.md');
const rutasPath = path.resolve('./cockpit/rutas.md');
const logPath = path.resolve('./cockpit/logs/actions-log.csv');
const markerStart = '## 🔍 Estado de rutas cockpitizadas';
const markerEnd = '--- 🛫 Fin de verificación cockpitizada ---';

const email = 'innovacioncomercialx@gmail.com';
const role = 'admin';
const timestamp = new Date().toISOString();
const action = 'Actualización de README.md con verificación de rutas cockpitizada';

if (!fs.existsSync(readmePath)) {
  console.error('❌ README.md no encontrado.');
  process.exit(1);
}

if (!fs.existsSync(rutasPath)) {
  console.error('❌ rutas.md no encontrado.');
  process.exit(1);
}

const readme = fs.readFileSync(readmePath, 'utf8');
const rutas = fs.readFileSync(rutasPath, 'utf8');
const bloque = `${markerStart}\n\n${rutas}\n\n${markerEnd}`;

let nuevoReadme;
if (readme.includes(markerStart)) {
  const inicio = readme.indexOf(markerStart);
  const fin = readme.indexOf(markerEnd) + markerEnd.length;
  nuevoReadme = readme.slice(0, inicio) + bloque + readme.slice(fin);
} else {
  nuevoReadme = readme + `\n\n${bloque}`;
}

fs.writeFileSync(readmePath, nuevoReadme);
console.log('✅ README.md actualizado con verificación de rutas cockpitizada.');

// Registrar acción en log
const dir = path.dirname(logPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, 'timestamp,email,role,action\n');
}
const line = `${timestamp},${email},${role},"${action}"\n`;
fs.appendFileSync(logPath, line);
console.log('📝 Acción registrada en actions-log.csv');
