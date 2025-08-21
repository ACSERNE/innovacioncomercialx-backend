const fs = require('fs');
const path = require('path');

const logPath = path.resolve('./cockpit/logs/actions-log.csv');
const email = 'innovacioncomercialx@gmail.com';
const role = 'admin';
const timestamp = new Date().toISOString();
const resultado = [];

const carpetas = ['controllers', 'models', 'routes', 'scripts', 'src', 'utils'];
const archivos = ['index.js', 'package.json', 'README.md', 'server.js'];

console.log('\n🔍 Verificando rutas cockpitizadas...\n');

carpetas.forEach(dir => {
  const exists = fs.existsSync(path.resolve(dir));
  const msg = exists ? `✅ Carpeta encontrada: ${dir}` : `❌ Carpeta faltante: ${dir}`;
  resultado.push(msg);
  console.log(msg);
});

archivos.forEach(file => {
  const exists = fs.existsSync(path.resolve(file));
  const msg = exists ? `✅ Archivo encontrado: ${file}` : `❌ Archivo faltante: ${file}`;
  resultado.push(msg);
  console.log(msg);
});

// Registrar en log cockpitizado
const action = `Verificación de rutas:\n${resultado.join('\n').replace(/"/g, "'")}`;
const line = `${timestamp},${email},${role},"${action}"\n`;
const dir = path.dirname(logPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, 'timestamp,email,role,action\n');
}
fs.appendFileSync(logPath, line);

console.log('\n📝 Resultado registrado en actions-log.csv');
