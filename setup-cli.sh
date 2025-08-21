#!/bin/bash

# 🧠 Detectar instalación previa
if [ -f ".cockpitrc" ] && [ "$1" != "--reset" ]; then
  echo "🛑 Ya existe una instalación cockpitizada en este directorio."
  echo "👉 Usa './setup-cli.sh --reset' para reinstalar desde cero."
  exit 0
fi

# 🧹 Reinicio si se solicita
if [ "$1" == "--reset" ]; then
  echo "🧹 Reiniciando instalación cockpitizada..."
  rm -rf acciones diagnosticos test-*.sh cli.js install.log .cockpitrc
fi

echo "🚀 Iniciando instalación cockpitizada..." | tee install.log

# 📋 Recolección de datos
read -p "👤 Nombre de usuario: " usuario
read -p "🏪 Nombre de la tienda: " tienda
read -p "🧠 Rol por defecto (admin/vendedor/comprador): " rol
read -p "⚙️ Modo de entorno (produccion/prueba): " entorno

# Inicializar proyecto Node.js si no existe
if [ ! -f package.json ]; then
  echo "📦 Inicializando proyecto Node.js..." | tee -a install.log
  npm init -y >> install.log
fi

# Instalar dependencias
echo "📦 Instalando dependencias..." | tee -a install.log
npm install inquirer chalk >> install.log

# Crear carpetas
mkdir -p acciones diagnosticos logs

# Crear archivo de configuración cockpit
cat << EOF > .cockpitrc
# Configuración cockpit CLI
instalado_en=$(date +"%Y-%m-%d %H:%M:%S")
usuario=$usuario
tienda=$tienda
rol_default=$rol
modo_entorno=$entorno
reportes=diagnosticos/
logs=logs/
idioma=es
EOF

# Crear cli.js
cat << 'EOF' > cli.js
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
EOF

# Crear acciones/admin.js
cat << 'EOF' > acciones/admin.js
module.exports = async (archivar) => {
  const inquirer = require('inquirer');
  const chalk = require('chalk');

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '📦 Panel Admin - Seleccione una opción:',
      choices: [
        'Ver inventario',
        'Agregar producto',
        'Registrar venta',
        'Ver flujo de caja',
        'Salir'
      ]
    }
  ]);

  console.log(chalk.green(`\n✅ Acción: ${opcion}\n`));
  archivar('admin', opcion);
};
EOF

# Crear acciones/vendedor.js
cat << 'EOF' > acciones/vendedor.js
module.exports = async (archivar) => {
  const inquirer = require('inquirer');
  const chalk = require('chalk');

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '🛍️ Panel Vendedor - Seleccione una opción:',
      choices: [
        'Crear producto',
        'Publicar en tienda en línea',
        'Ver productos activos',
        'Ver estadísticas de ventas',
        'Salir'
      ]
    }
  ]);

  console.log(chalk.green(`\n✅ Acción: ${opcion}\n`));
  archivar('vendedor', opcion);
};
EOF

# Crear acciones/comprador.js
cat << 'EOF' > acciones/comprador.js
module.exports = async (archivar) => {
  const inquirer = require('inquirer');
  const chalk = require('chalk');

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '🛒 Panel Comprador - Seleccione una opción:',
      choices: [
        'Buscar productos',
        'Ver carrito',
        'Confirmar compra',
        'Rastrear pedido',
        'Salir'
      ]
    }
  ]);

  console.log(chalk.green(`\n✅ Acción: ${opcion}\n`));
  archivar('comprador', opcion);
};
EOF

# Crear scripts de prueba
echo "node cli.js admin" > test-admin.sh
echo "node cli.js vendedor" > test-vendedor.sh
echo "node cli.js comprador" > test-comprador.sh
chmod +x test-*.sh

echo "✅ Instalación completa. Ejecuta './test-admin.sh' para comenzar." | tee -a install.log