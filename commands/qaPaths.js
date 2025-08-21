const fs = require("fs");

module.exports = function qaPaths() {
  const paths = ["logs", "csv", "output"];
  console.log("🔍 Verificando rutas necesarias...");
  paths.forEach((dir) => {
    if (fs.existsSync(dir)) {
      console.log(`✅ Carpeta presente: ${dir}`);
    } else {
      console.warn(`⚠️ Carpeta faltante: ${dir}`);
    }
  });
};