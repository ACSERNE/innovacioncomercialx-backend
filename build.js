const { execSync } = require('child_process');
const targets = [
  'node18-win-x64',
  'node18-linux-x64',
  'node18-macos-x64'
];

console.log('🚀 Empaquetando Innovación ComercialX cockpitizada...\n');

targets.forEach(target => {
  try {
    console.log(`📦 Generando para ${target}...`);
    execSync(`pkg index.js --targets ${target} --output dist/comercialx-${target}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ Error al generar ${target}:`, err.message);
  }
});

console.log('\n✅ Empaquetado completo. Ejecutables disponibles en ./dist');
