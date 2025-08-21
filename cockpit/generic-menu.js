async function main() {
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const logAction = (user, role, action) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp},${user},${action}\n`;
  const logPath = path.join(__dirname, 'logs', `${role}-log.csv`);
  fs.appendFileSync(logPath, logEntry);
};

const genericMenu = async (user, role) => {
  const configPath = path.join(__dirname, 'config', `${role}-menu.json`);
  if (!fs.existsSync(configPath)) {
    console.error(`❌ No hay menú configurado para el rol "${role}".`);
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const labels = config.map(item => item.label);

  const { choice } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'choice',
      message: `Bienvenido, ${user}. Elige una opción por número:`,
      choices: labels
    }
  ]);

  logAction(user, role, choice);

  const selected = config.find(item => item.label === choice);

  switch (selected.action) {
    case 'exit':
      console.log('👋 Hasta luego.');
      break;
    default:
      console.log(`⚙️ Acción "${selected.action}" ejecutada (simulada).`);
  }
};

module.exports = genericMenu;
}
main()
