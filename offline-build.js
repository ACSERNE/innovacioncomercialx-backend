const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const localPkg = path.resolve('./pkg-win.exe');
const output = './dist/comercialx.exe';

console.log('🧭 Empaquetador cockpitizado sin conexión\n');

// 1. Verificar si pkg-win.exe está presente
if (!fs.existsSync(localPkg)) {
  console.log('❌ No se encontró pkg-win.exe en el directorio actual.');
  console.log('💡 Descárgalo desde https://github.com/vercel/pkg/releases y colócalo aquí.');
  process.exit(1);
}

// 2. Ejecutar empaquetado
try {
  console.log(`📦 Usando binario local: ${localPkg}`);
  execSync(`${localPkg} index.js --targets node18-win-x64 --output ${output}`, { stdio: 'inherit' });
  console.log(`\n✅ Binario generado: ${output}`);
} catch (err) {
  console.log(`❌ Error al ejecutar pkg: ${err.message}`);
  console.log('💡 Verifica que el archivo sea ejecutable y que index.js esté completo.');
}
