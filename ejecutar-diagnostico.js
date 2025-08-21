// ejecutar-diagnostico.js
const { execSync } = require('child_process');

try {
  const resultado = execSync('docker exec backend-innovacion node /app/diagnosticos/verificar-servicios.js', {
    encoding: 'utf-8',
    shell: true,
  });
  console.log('✅ Diagnóstico ejecutado:\n', resultado);
} catch (err) {
  console.error('❌ Error:\n', err.message);
}