const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '../../'); // Ir 2 niveles arriba
const backendDir = path.join(rootDir, 'backend');
const routesDir = path.join(backendDir, 'routes');
const controllersDir = path.join(backendDir, 'controllers');
const modelsDir = path.join(backendDir, 'models');

function qaPaths() {
  console.log('📂 Directorios principales:');
  console.log('🔹 Backend Root:', backendDir);
  console.log('🔹 Rutas       :', routesDir);
  console.log('🔹 Controladores:', controllersDir);
  console.log('🔹 Modelos     :', modelsDir);

  [routesDir, controllersDir, modelsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️ No existe el directorio: ${dir}`);
    }
  });
}

module.exports = {
  qaPaths,
};

