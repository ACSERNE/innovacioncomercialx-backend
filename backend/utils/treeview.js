const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function formatDate(mtime) {
  return new Date(mtime).toLocaleString('es-CL', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

function colorPorExtension(fileName) {
  if (fileName.endsWith('.js')) return chalk.green(fileName);
  if (fileName.endsWith('.md')) return chalk.cyan(fileName);
  if (fileName.endsWith('.json')) return chalk.yellow(fileName);
  return chalk.white(fileName);
}

function imprimirEstructura(baseDir = './backend', nivel = 0) {
  const indent = '│  '.repeat(nivel);
  const items = fs.readdirSync(baseDir);

  items.forEach(item => {
    const fullPath = path.join(baseDir, item);
    const stats = fs.statSync(fullPath);
    const esDir = stats.isDirectory();
    const tipo = esDir ? chalk.blue.bold('📁') : chalk.gray('📄');
    const nombre = esDir ? chalk.blue(item) : colorPorExtension(item);
    const size = esDir ? '' : chalk.magenta(formatSize(stats.size));
    const fecha = chalk.dim(formatDate(stats.mtime));
    console.log(`${indent}${tipo} ${nombre} ${size} ${fecha}`);
    if (esDir) imprimirEstructura(fullPath, nivel + 1);
  });
}

module.exports = { imprimirEstructura };
