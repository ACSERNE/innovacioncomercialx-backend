const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const repoFolder = path.join(__dirname, 'innovacioncomercialx-backend');

if (!fs.existsSync(repoFolder)) {
  console.log('✅ No se detectó carpeta clonada. Todo listo.');
  process.exit(0);
}

console.log('⚠️  Se detectó carpeta clonada: innovacioncomercialx-backend');
console.log('¿Qué deseas hacer?\n');
console.log('1️⃣  Trabajar desde la carpeta clonada');
console.log('2️⃣  Reemplazar tu estructura actual con la del repositorio');
console.log('3️⃣  Cancelar y decidir manualmente\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Selecciona una opción (1, 2 o 3): ', answer => {
  switch (answer.trim()) {
    case '1':
      console.log('\n🧭 Abriendo entorno desde carpeta clonada...');
      try {
        process.chdir(repoFolder);
        execSync('node index.js', { stdio: 'inherit' });
      } catch (err) {
        console.log(`❌ Error al ejecutar index.js: ${err.message}`);
      }
      break;

    case '2':
      console.log('\n🔁 Reemplazando estructura actual...');
      const folders = fs.readdirSync(repoFolder);
      folders.forEach(item => {
        const src = path.join(repoFolder, item);
        const dest = path.join(__dirname, item);
        if (fs.existsSync(dest)) {
          console.log(`⚠️  Ya existe: ${item} — no se sobrescribirá`);
        } else {
          execSync(`mv "${src}" "${dest}"`);
          console.log(`✅ Movido: ${item}`);
        }
      });
      console.log('\n🧹 Eliminando carpeta clonada...');
      execSync(`rmdir "${repoFolder}"`);
      console.log('✅ Reorganización completa.');
      break;

    default:
      console.log('\n⏹️ Operación cancelada. Puedes decidir manualmente.');
  }

  rl.close();
});
