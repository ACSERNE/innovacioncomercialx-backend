const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const target = path.join(__dirname, 'innovacioncomercialx-backend');
const logPath = path.resolve('./cockpit/logs/actions-log.csv');
const email = 'innovacioncomercialx@gmail.com';
const role = 'admin';

if (!fs.existsSync(target)) {
  console.log('✅ No hay carpetas clonadas residuales. Todo limpio.');
  process.exit(0);
}

console.log('\n🧹 Carpeta residual detectada: innovacioncomercialx-backend\n');

const contents = fs.readdirSync(target);
console.log('📦 Contenido:\n');
contents.forEach(item => console.log(`  - ${item}`));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('\n¿Deseas eliminar esta carpeta completamente? (Y/n): ', answer => {
  const confirm = answer.trim().toLowerCase();
  if (confirm === 'y' || confirm === '') {
    try {
      execSync(`rm -rf "${target}"`);
      console.log('\n✅ Carpeta eliminada correctamente.');

      // Registrar acción en log cockpitizado
      const timestamp = new Date().toISOString();
      const action = 'Eliminación de carpeta residual: innovacioncomercialx-backend';
      const line = `${timestamp},${email},${role},"${action}"\n`;
      const dir = path.dirname(logPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      if (!fs.existsSync(logPath)) {
        fs.writeFileSync(logPath, 'timestamp,email,role,action\n');
      }
      fs.appendFileSync(logPath, line);
      console.log('📝 Acción registrada en actions-log.csv');
    } catch (err) {
      console.log(`❌ Error al eliminar carpeta: ${err.message}`);
    }
  } else {
    console.log('\n⏹️ Eliminación cancelada. Puedes hacerlo manualmente si lo deseas.');
  }
  rl.close();
});
