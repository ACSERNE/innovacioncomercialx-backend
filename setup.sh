#!/bin/bash

echo "╭────────────────────────────────────────────╮"
echo "│ 🛠️ ComercialX Cockpit - Setup Inicial      │"
echo "╰────────────────────────────────────────────╯"

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
STATUS=""

# Detectar package.json
if [ ! -f package.json ]; then
  echo "📦 Generando package.json cockpitizado..."
  cat << 'PKG' > package.json
{
  "name": "comercialx-backend",
  "version": "1.0.0",
  "description": "Backend cockpitizado para ComercialX",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "inquirer": "^9.0.0",
    "node-fetch": "^3.3.2"
  }
}
PKG
  STATUS+="| package.json | ✅ Generado |\n"
else
  echo "📦 package.json ya existe."
  STATUS+="| package.json | ✅ Detectado |\n"
fi

# Detectar node_modules
if [ ! -d node_modules ]; then
  echo "📦 Instalando dependencias..."
  npm install
  STATUS+="| node_modules | ✅ Instalado |\n"
else
  echo "📦 Dependencias ya instaladas."
  STATUS+="| node_modules | ✅ Detectado |\n"
fi

# Detectar config.json
if [ ! -f config.json ]; then
  echo "⚙️ Generando config.json con puerto 3000..."
  echo "{ \"port\": 3000, \"timestamp\": \"$TIMESTAMP\" }" > config.json
  STATUS+="| config.json | ✅ Generado |\n"
else
  echo "⚙️ config.json ya existe."
  STATUS+="| config.json | ✅ Detectado |\n"
fi

# Exportar log visual
echo -e "# 🧾 Estado del Setup ComercialX\n\n| Componente     | Estado        |\n|----------------|----------------|\n$STATUS\n🕒 Timestamp: $TIMESTAMP\n✍️ *ComercialX Cockpit CLI*" > setup-status.md
echo "📄 Log exportado como setup-status.md"
