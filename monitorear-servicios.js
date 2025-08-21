const { execSync } = require('child_process');

try {
  execSync('bash ./diagnostico-loop.sh', { stdio: 'inherit', shell: true });
} catch (err) {
  console.error('❌ Error al iniciar monitoreo:', err.message);
}
