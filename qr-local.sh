#!/usr/bin/env bash
set -e

# Detectar IP local
IP=$(hostname -I | awk '{print $1}')
PORT=${1:-8080}
ENTORNO=${2:-dev}

URL="http://${IP}:${PORT}/${ENTORNO}/${ENTORNO}.html"

echo "📱 Accede al micrositio desde tu celular:"
echo "🔗 $URL"

# Generar QR visual en terminal
if command -v npx >/dev/null 2>&1; then
  npx qrcode-terminal "$URL"
else
  echo "❌ npx no disponible. Instala Node.js para generar QR."
fi
