const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const target = path.join(__dirname, 'innovacioncomercialx-backend');

if (!fs.existsSync(target)) {
  console.log('✅ No hay carpetas clonadas residuales. Todo limpio.');
  process.exit(0);
}

console.log('\n🧹 Carpeta residual detectada: innovacioncomercialx-backend\n');

const contents = fs.readdirSync(target);
console.log('📦 Contenido:\n');
contents.forEach(item => console.log(`  - ${item}`));

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: '\n¿Deseas eliminar esta carpeta completamente?',
      default: false
    }
  ])
  .then(({ confirmDelete }) => {
    if (confirmDelete) {
      try {
        execSync(`rm -rf "${target}"`);
        console.log('\n✅ Carpeta eliminada correctamente.');
      } catch (err) {
        console.log(`❌ Error al eliminar carpeta: ${err.message}`);
      }
    } else {
      console.log('\n⏹️ Eliminación cancelada. Puedes hacerlo manualmente si lo deseas.');
    }
  });
