const fs = require('fs');
const path = require('path');

const carpetaBase = path.resolve(__dirname);
const textoBuscar = 'Token no proporcionado';
const extensionesPermitidas = ['.js', '.json', '.txt'];

async function buscarEnArchivo(rutaArchivo) {
  try {
    const contenido = await fs.promises.readFile(rutaArchivo, 'utf8');
    if (contenido.includes(textoBuscar)) {
      console.log(`Encontrado en: ${rutaArchivo}`);
    }
  } catch (err) {
    // Ignorar errores de lectura (permisos, binarios, etc)
  }
}

async function explorarCarpeta(carpeta) {
  try {
    const archivosYCarpetas = await fs.promises.readdir(carpeta, { withFileTypes: true });
    for (const item of archivosYCarpetas) {
      const rutaCompleta = path.join(carpeta, item.name);
      if (item.isDirectory()) {
        // Ignorar carpetas ocultas (opcional)
        if (!item.name.startsWith('.')) {
          await explorarCarpeta(rutaCompleta);
        }
      } else if (item.isFile()) {
        if (extensionesPermitidas.includes(path.extname(item.name))) {
          await buscarEnArchivo(rutaCompleta);
        }
      }
    }
  } catch (err) {
    // Ignorar errores (por ejemplo permisos denegados)
  }
}

explorarCarpeta(carpetaBase).then(() => {
  console.log('Búsqueda terminada.');
});
