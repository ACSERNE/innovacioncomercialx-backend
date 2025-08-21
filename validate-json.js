const fs = require('fs');
const path = require('path');

const files = [
  'backend-extendido.json',
  'docker-extendido.json',
  'entorno-extendido.json',
  'docs-extendido.json'
];

files.forEach(file => {
  try {
    const data = fs.readFileSync(path.join('routes-site', file), 'utf8');
    JSON.parse(data);
    console.log(`✅ ${file} es válido`);
  } catch (err) {
    console.error(`❌ ${file} inválido: ${err.message}`);
  }
});
