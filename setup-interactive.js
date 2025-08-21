const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const repoFolder = path.join(__dirname, 'innovacioncomercialx-backend');

if (!fs.existsSync(repoFolder)) {
  console.log('✅ No se detectó carpeta clonada. Todo listo.');
  process.exit(0);
}

console.log('\n🧭 Asistente cockpitizado de estructura de proyecto\n');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Se detectó una carpeta clonada: innovacioncomercialx-backend\n¿Qué deseas hacer?',
      choices: [
        '🧭 Trabajar desde la carpeta clonada',
        '🔁 Reemplazar estructura actual con la del repositorio',
        '⏹️ Cancelar y decidir manualmente'
      ]
    }
  ])
  .then(({ action }) => {
    switch (action) {
      case '🧭 Trabajar desde la carpeta clonada':
        console.log('\n🚀 Ejecutando desde carpeta clonada...');
        try {
          process.chdir(repoFolder);
          execSync('node index.js', { stdio: 'inherit' });
        } catch (err) {
          console.log(`❌ Error al ejecutar index.js: ${err.message}`);
        }
        break;

      case '🔁 Reemplazar estructura actual con la del repositorio':
        console.log('\n🔁 Reorganizando estructura...');
        const items = fs.readdirSync(repoFolder);
        items.forEach(item => {
          const src = path.join(repoFolder, item);
          const dest = path.join(__dirname, item);
          if (fs.existsSync(dest)) {
            console.log(`⚠️  Ya existe: ${item} — no se sobrescribirá`);
          } else {
            execSync(`mv "${src}" "${dest}"`);
            console.log(`✅ Movido: ${item}`);
          }
        });
        execSync(`rmdir "${repoFolder}"`);
        console.log('\n✅ Reorganización completa.');
        break;

      default:
        console.log('\n⏹️ Operación cancelada. Puedes decidir manualmente.');
    }
  });
