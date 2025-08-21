const figlet = require('figlet');
const chalk = require('chalk');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mostrarCabeceraDinamica({ sistema = 'CLI', tipo = 'modulo', modo = 'normal', mostrarFecha = true, animar = true }) {
  const fecha = new Date().toLocaleString('es-CL', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });

  const color =
    tipo === 'validador' ? chalk.green :
    tipo === 'exportador' ? chalk.cyan :
    tipo === 'auditor' ? chalk.yellow :
    chalk.blue;

  const banner = figlet.textSync(sistema.toUpperCase(), { horizontalLayout: 'full' });
  console.log(color(banner));
  console.log(color('╔════════════════════════════════════════════╗'));
  console.log(color(`║ MÓDULO: ${tipo.padEnd(34)}║`));
  console.log(color(`║ MODO:   ${modo.padEnd(34)}║`));
  if (mostrarFecha) {
    console.log(color(`║ FECHA:  ${fecha.padEnd(34)}║`));
  }
  console.log(color('╚════════════════════════════════════════════╝\n'));

  if (animar) {
    process.stdout.write(chalk.gray('Inicializando'));
    for (let i = 0; i < 5; i++) {
      await delay(300); process.stdout.write(chalk.gray('.'));
    }
    console.log('\n');
  }
}

module.exports = { mostrarCabeceraDinamica };
