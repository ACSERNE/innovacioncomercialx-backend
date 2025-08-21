const dns = require('dns');
const https = require('https');
const { execSync } = require('child_process');

console.log('🔍 Verificando conectividad cockpitizada...\n');

let dnsOK = false;
let httpsOK = false;
let proxyDetected = false;

// 1. Verificar resolución DNS
dns.lookup('registry.npmjs.org', (err, address) => {
  if (err) {
    console.log('❌ Error de DNS: No se pudo resolver registry.npmjs.org');
    console.log('💡 Sugerencia: Verifica tu conexión a internet o cambia de DNS (por ejemplo, 8.8.8.8)');
  } else {
    console.log(`✅ DNS resuelto: ${address}`);
    dnsOK = true;
  }

  // 2. Verificar acceso HTTPS
  const req = https.get('https://registry.npmjs.org/', res => {
    console.log(`✅ Conexión HTTPS: ${res.statusCode} ${res.statusMessage}`);
    httpsOK = res.statusCode === 200;
    continuar();
  });

  req.on('error', e => {
    console.log(`❌ Error de conexión HTTPS: ${e.code} — ${e.message}`);
    if (e.code === 'ECONNRESET') {
      console.log('💡 Sugerencia: Estás detrás de un proxy o VPN. Revisa tu configuración de red.');
    } else if (e.code === 'ENOTFOUND') {
      console.log('💡 Sugerencia: Verifica tu DNS o conexión a internet.');
    }
    continuar();
  });

  req.end();

  // 3. Verificar configuración de proxy
  try {
    const proxy = execSync('npm config get proxy').toString().trim();
    const httpsProxy = execSync('npm config get https-proxy').toString().trim();

    if (proxy !== 'null' || httpsProxy !== 'null') {
      console.log(`⚠️  Proxy detectado:\n  proxy: ${proxy}\n  https-proxy: ${httpsProxy}`);
      console.log('💡 Sugerencia: Si no usas proxy, puedes eliminarlo con:\n  npm config delete proxy\n  npm config delete https-proxy');
      proxyDetected = true;
    } else {
      console.log('✅ Sin proxy configurado en npm');
    }
  } catch (err) {
    console.log('❌ Error al leer configuración de npm:', err.message);
    console.log('💡 Sugerencia: Asegúrate de tener npm correctamente instalado.');
  }

  // 4. Si todo está bien, limpiar caché y reintentar instalación
  function continuar() {
    if (dnsOK && httpsOK && !proxyDetected) {
      console.log('\n🧼 Red limpia detectada. Intentando instalar pkg...');
      try {
        execSync('npm cache clean --force', { stdio: 'inherit' });
        execSync('npm install -g pkg', { stdio: 'inherit' });
        console.log('\n✅ pkg instalado correctamente. Puedes ejecutar build.js');
      } catch (err) {
        console.log(`❌ Falló la instalación de pkg: ${err.message}`);
        console.log('💡 Sugerencia: Intenta instalar manualmente o revisa tu red nuevamente.');
      }
    } else {
      console.log('\n⏹️ Instalación automática de pkg omitida por problemas de red.');
    }
  }
});
