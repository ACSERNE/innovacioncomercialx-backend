const fs = require('fs');
const path = require('path');

const logPath = path.resolve('./cockpit/logs/actions-log.csv');
const timestamp = new Date().toISOString();
const email = 'innovacioncomercialx@gmail.com';
const role = 'admin';
const action = 'Eliminación de carpeta residual: innovacioncomercialx-backend';

const line = `${timestamp},${email},${role},"${action}"\n`;

const dir = path.dirname(logPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, 'timestamp,email,role,action\n');
}

fs.appendFileSync(logPath, line);
console.log('✅ Acción registrada en actions-log.csv');
