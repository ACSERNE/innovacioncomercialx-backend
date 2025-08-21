const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const config = Object.fromEntries(
  fs.readFileSync('.cockpitrc', 'utf-8')
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('=').map(v => v.trim()))
);

const modo = process.argv[2] || config.rol_default;

const rutas = {
  admin: './acciones/admin.js',
  vendedor: './acciones/vendedor.js',
  comprador: './acciones/comprador.js'
};

if (!rutas[modo]) {
  console.log(chalk.red('\n❌ Modo inválido. Usa: admin | vendedor | comprador\n'));
  process.exit(1);
}

const archivarAccion = (modo, accion) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archivo = path.join(config.reportes, `${modo}-${timestamp}.md`);
  const contenido = `# Acción ejecutada\n\n- Usuario: ${config.usuario}\n- Tienda: ${config.tienda}\n- Modo: ${modo}\n- Opción: ${accion}\n- Timestamp: ${timestamp}\n`;
  fs.writeFileSync(archivo, contenido);
  console.log(chalk.yellow(`📄 Acción archivada en ${archivo}`));
};

require(rutas[modo])(archivarAccion);
