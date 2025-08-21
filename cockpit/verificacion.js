const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function registrarAccion(email, role, accion) {
  const logPath = path.resolve('./cockpit/logs/actions-log.csv');
  const timestamp = new Date().toISOString();
  const line = `${timestamp},${email},${role},"${accion}"\n`;
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, 'timestamp,email,role,action\n');
  }
  fs.appendFileSync(logPath, line);
}

async function verificarIdentidad() {
  const { nombre, email, telefono } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: '👤 Ingresa tu nombre completo:' },
    { type: 'input', name: 'email', message: '📧 Ingresa tu correo electrónico:' },
    { type: 'input', name: 'telefono', message: '📱 Ingresa tu número de teléfono:' }
  ]);

  const codigo = generarCodigo();
  console.log(`\n📲 Código de verificación enviado a ${telefono}: ${codigo}\n`);

  const { ingreso } = await inquirer.prompt([
    { type: 'input', name: 'ingreso', message: '🔐 Ingresa el código recibido:' }
  ]);

  if (ingreso === codigo) {
    console.log('\n✅ Verificación exitosa. Bienvenido al sistema cockpitizado.\n');
    registrarAccion(email, 'usuario', 'Verificación de identidad exitosa');
    return { nombre, email, rol: 'usuario', ultimaAccion: 'Verificación exitosa', timestamp: new Date().toISOString() };
  } else {
    console.log('\n❌ Código incorrecto. Acceso denegado.\n');
    registrarAccion(email, 'usuario', 'Intento fallido de verificación');
    return null;
  }
}

module.exports = verificarIdentidad;
