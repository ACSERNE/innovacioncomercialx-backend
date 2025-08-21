const inquirer = require('inquirer');
const { exec } = require('child_process');

async function mostrarMenu() {
  const opciones = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: '🚀 Admin Tools - Elige una acción:',
      choices: [
        'Estado de la Base de Datos',
        'Análisis de Migraciones (impacto crítico)',
        'Generar Reporte HTML Gerencial',
        'Explorar Dashboards Técnicos',
        'Verificar Entorno y Dependencias',
        'Salir'
      ]
    }
  ]);

  const ejecutar = (script) =>
    exec(`node scripts/${script}`, (_, stdout, stderr) => {
      if (stderr) console.error(stderr);
      else console.log(stdout);
    });

  switch (opciones.accion) {
    case 'Estado de la Base de Datos':
      ejecutar('estadoBD.js');
      break;
    case 'Análisis de Migraciones (impacto crítico)':
      ejecutar('analizarCambiosMigraciones.js');
      break;
    case 'Generar Reporte HTML Gerencial':
      ejecutar('reporteBD.js');
      break;
    case 'Explorar Dashboards Técnicos':
      ejecutar('explorarDashboards.js');
      break;
    case 'Verificar Entorno y Dependencias':
      ejecutar('verificar-entorno.js');
      break;
    case 'Salir':
    default:
      console.log('👋 Cerrando Admin Tools');
      process.exit(0);
  }
}

mostrarMenu();