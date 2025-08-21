const inquirer = require('inquirer');
const { mostrarCabeceraDinamica } = require('../utils/cabeceraDinamica');

async function iniciarCLI() {
  await mostrarCabeceraDinamica({
    sistema: 'innovacioncomercialx',
    tipo: 'CLI',
    modo: 'cockpit',
    animar: true,
    mostrarFecha: true
  });

  const { modulo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'modulo',
      message: '🧭 Selecciona un módulo para ejecutar:',
      choices: [
        { name: '🔍 Validador de Semillas', value: 'validador' },
        { name: '🚦 Auditor de Rutas', value: 'auditor' },
        { name: '📤 Exportador Batch', value: 'exportador' },
        { name: '🌳 Ver estructura del proyecto', value: 'estructura' }
      ]
    }
  ]);

  switch (modulo) {
    case 'validador': require('./modules/validador')(); break;
    case 'auditor': require('./modules/auditor')(); break;
    case 'exportador': require('./modules/exportador')(); break;
    case 'estructura': require('./tools/estructura')(); break;
    default: console.log('❌ Módulo no reconocido');
  }
}

iniciarCLI();
