const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'logs', 'actions-log.csv');

const logAction = (user, action) => {
  const timestamp = new Date().toISOString();
  const entry = `${timestamp},${user.email},${user.role},${action}\n`;
  fs.appendFileSync(logPath, entry);
};

module.exports = logAction;
