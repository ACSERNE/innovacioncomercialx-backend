const inquirer = require("inquirer");
const core = require("./diagnostico-core");

async function mostrarMenu() {
  const opciones = await inquirer.prompt([
    {
      type: "checkbox",
      name: "validaciones",
      message: "Selecciona las validaciones que deseas ejecutar:",
      choices: [
        { name: "🐳 Docker activo", value: "docker" },
        { name: "🩺 Estado healthy del contenedor", value: "healthy" },
        { name: "🔌 Conexión a PostgreSQL", value: "conexion" },
        { name: "📦 Base de datos 'mi_db'", value: "db" },
        { name: "📁 Migraciones pendientes", value: "migraciones" },
        { name: "📄 Exportar reporte markdown", value: "exportar" },
      ],
    },
  ]);

  console.log("\n🚀 Ejecutando validaciones seleccionadas...\n");

  for (const opcion of opciones.validaciones) {
    switch (opcion) {
      case "docker":
        core.verificarDocker();
        break;
      case "healthy":
        core.verificarHealthy();
        break;
      case "conexion":
        core.verificarConexionPostgres();
        break;
      case "db":
        core.verificarBaseDeDatos();
        break;
      case "migraciones":
        core.verificarMigraciones();
        break;
      case "exportar":
        core.exportarMarkdown();
        break;
    }
  }

  if (!opciones.validaciones.includes("exportar")) {
    core.exportarMarkdown();
  }
}

module.exports = { mostrarMenu };
