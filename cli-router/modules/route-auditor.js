// ┌────────────────────────────┐
// │  VALDEZ · ENV VALIDATOR    │
// └────────────────────────────┘

const fs = require('fs');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config();

const REQUIRED_KEYS = {
  DATABASE_URL: 'postgres://usuario:clave@localhost:5432/db',
  AUTH_SECRET: 'auto-generado',
  NODE_ENV: 'development',
  LOG_DIR: './logs',
  LOG_LEVEL: 'info',
};

const timestamp = new Date().toISOString();
const missing = [];
const suggestions = [];

console.log(chalk.cyan.bold(`\n🔍 VALDEZ-CLI ENV AUDIT @ ${timestamp}\n`));

for (const key in REQUIRED_KEYS) {
  if (!process.env[key]) {
    missing.push(key);
    suggestions.push(`${key}=${REQUIRED_KEYS[key]}`);
    console.log(chalk.red(`❌ Falta ${key}`));
  } else {
    console.log(chalk.green(`✅ ${key} → OK`));
  }
}

if (missing.length > 0) {
  const suggestionText = suggestions.join('\n');
  fs.writeFileSync(`${REQUIRED_KEYS.LOG_DIR || './logs'}/env-audit-${Date.now()}.log`,
    `🔒 AUDITORÍA VALDEZ\nClaves faltantes:\n${missing.join(', ')}\nSugerencias:\n${suggestionText}\n`);

  console.log(chalk.yellow(`\n🛠️ Sugerencias para completar tu .env:\n`));
  console.log(chalk.gray(suggestionText));
} else {
  console.log(chalk.greenBright(`\n✅ Todos los valores requeridos están presentes.\n`));
}