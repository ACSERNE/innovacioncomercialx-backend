async function main() {
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config', 'auditor-menu.json');
const logPath = path.join(__dirname, 'logs', 'auditor-log.csv');
const mdPath = path.join(__dirname, 'logs', 'auditor-log.md');

const logAction = (user, action) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp},${user},${action}\n`;
  fs.appendFileSync(logPath, logEntry);
};

const showRecentActions = () => {
  if (!fs.existsSync(logPath)) {
    console.log('📭 No hay registros aún.');
    return;
  }
  const lines = fs.readFileSync(logPath, 'utf-8').trim().split('\n');
  const recent = lines.slice(-5);
  console.log('\n📋 Acciones recientes:');
  recent.forEach((line, i) => {
    const [timestamp, user, action] = line.split(',');
    console.log(` ${i + 1}. [${timestamp}] ${user} → ${action}`);
  });
};

const exportMarkdown = () => {
  if (!fs.existsSync(logPath)) {
    console.log('📭 No hay registros para exportar.');
    return;
  }
  const lines = fs.readFileSync(logPath, 'utf-8').trim().split('\n');
  const markdown = lines.map((line) => {
    const [timestamp, user, action] = line.split(',');
    return `- **${timestamp}** — ${user} → ${action}`;
  }).join('\n');
  fs.writeFileSync(mdPath, `# Auditor Log\n\n${markdown}\n`);
  console.log(`✅ Log exportado como Markdown: logs/auditor-log.md`);
};

const auditorMenu = async (user) => {
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

  logAction(user, choice);

  const selected = config.find(item => item.label === choice);

  switch (selected.action) {
    case 'showOnboarding':
      console.log('Mostrando registros de onboarding...');
      break;
    case 'showRecent':
      showRecentActions();
      break;
    case 'exportCSV':
      console.log('El log ya está en CSV: logs/auditor-log.csv');
      break;
    case 'exportMarkdown':
      exportMarkdown();
      break;
    case 'exit':
      console.log('Hasta luego, auditor.');
      break;
    default:
      console.log('⚠️ Acción no reconocida.');
  }
};

module.exports = auditorMenu;
}
main()
