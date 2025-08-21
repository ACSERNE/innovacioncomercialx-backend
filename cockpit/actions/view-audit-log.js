async function main() {
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const logPath = path.join(__dirname, '..', 'logs', 'actions-log.csv');

module.exports = async () => {
  if (!fs.existsSync(logPath)) {
    console.log('📭 No hay registros de auditoría.');
    return;
  }

  const lines = fs.readFileSync(logPath, 'utf-8').trim().split('\n').slice(1); // skip header

  const { filterType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'filterType',
      message: '🧾 ¿Cómo deseas filtrar el log?',
      choices: ['Por usuario', 'Por rol', 'Por acción', 'Ver todo']
    }
  ]);

  let filtered = lines;

  if (filterType !== 'Ver todo') {
    const { value } = await inquirer.prompt([
      { type: 'input', name: 'value', message: `🔍 Ingresa ${filterType.toLowerCase()}:` }
    ]);

    const column = filterType === 'Por usuario' ? 1
                 : filterType === 'Por rol' ? 2
                 : 3;

    filtered = lines.filter(line => line.split(',')[column].toLowerCase().includes(value.toLowerCase()));
  }

  if (filtered.length === 0) {
    console.log('🚫 No se encontraron coincidencias.');
    return;
  }

  console.log('\n📋 Resultados filtrados:');
  filtered.forEach((line, i) => {
    const [ts, email, role, action] = line.split(',');
    console.log(` ${i + 1}. [${ts}] ${email} (${role}) → ${action}`);
  });
};
}
main()
