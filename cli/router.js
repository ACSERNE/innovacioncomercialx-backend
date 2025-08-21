// ┌────────────────────────────┐
// │    VALDEZ CLI · ROUTER     │
// └────────────────────────────┘

const chalk = require('chalk');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const flag = args[0];

console.log(chalk.cyan.bold('\n🧭 VALDEZ CLI · ROUTER ACTIVO\n'));

switch (flag) {
  case '--init':
    console.log(chalk.green('🔧 Ejecutando setup inicial...'));
    execSync('node setup.js', { stdio: 'inherit' });
    break;

  case '--audit':
    console.log(chalk.yellow('📋 Ejecutando auditoría de .env...'));
    execSync('node modules/auditoria/validator.js', { stdio: 'inherit' });
    break;

  case '--rotate':
    console.log(chalk.magenta('🔐 Ejecutando rotación de AUTH_SECRET...'));
    execSync('node modules/auditoria/rotate-auth.js', { stdio: 'inherit' });
    break;

  case '--help':
  default:
    console.log(chalk.gray(`
Uso: node router.js [flag]

--init     🧱 Crea estructura técnica (setup.js)
--audit    📋 Audita variables .env (validator.js)
--rotate   🔐 Rota clave AUTH_SECRET si expiró (rotate-auth.js)
--help     ❓ Muestra este menú de ayuda
`));
    break;
}