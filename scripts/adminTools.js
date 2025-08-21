const inquirer = require('inquirer');
const prompt = inquirer.prompt || (inquirer.default && inquirer.default.prompt);
const { exec } = require('child_process');

async function mostrarMenu() {
  const opciones = await prompt([
    {
      type: 'list',
      name: 'accion',
      message: '🚀 Admin Tools - Elige una acción:',
      choices: [
        'Estado de la Base de Datos',
        'Análisis de Migraciones (impacto crítico)',
        'Generar Reporte HTML Gerencial',
        'Cargar Seeds por Módulo',
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

    case 'Cargar Seeds por Módulo':
      await mostrarGestorSeeds();
      break;

    case 'Salir':
    default:
      console.log('👋 Cerrando Admin Tools');
      process.exit(0);
  }
}

async function mostrarGestorSeeds() {
  const seeds = await prompt([
    {
      type: 'list',
      name: 'seedSeleccionado',
      message: '🧪 Seleccioná el seed que querés ejecutar:',
      choices: [
        'Todos los seeds',
        'demo-users.js',
        'demo-productos.js',
        'demo-productos-cliente.js',
        'demo-logactividad.js',
        'Cancelar'
      ]
    }
  ]);

  switch (seeds.seedSeleccionado) {
    case 'Todos los seeds':
      exec('npm run seed', (_, stdout, stderr) => {
        if (stderr) console.error(stderr);
        else console.log(stdout);
      });
      break;

    case 'Cancelar':
      console.log('⏸️ Acción cancelada.');
      break;

    default:
      exec(
        `docker exec backend-innovacion npx sequelize-cli db:seed --seed ${seeds.seedSeleccionado}`,
        (_, stdout, stderr) => {
          if (stderr) console.error(stderr);
          else console.log(stdout);
        }
      );
      break;
  }
}

mostrarMenu();