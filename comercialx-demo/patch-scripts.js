const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json'));

// Asegura que el bloque "scripts" exista
pkg.scripts = pkg.scripts || {};

// Agrega el script build si no está definido
if (!pkg.scripts.build) {
  pkg.scripts.build = 'vite build';
  console.log('✅ Script "build" agregado exitosamente.');
} else {
  console.log('ℹ️ Script "build" ya existe. No se modificó.');
}

// Guarda el package.json actualizado
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
