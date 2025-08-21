const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '..', 'logs', 'router-cli.csv');
function logExecution(command) {
  const timestamp = new Date().toISOString();
  const logLine = \`"\${timestamp}","\${command}"\n\`;
  fs.appendFileSync(logPath, logLine);
}
module.exports = { logExecution };
