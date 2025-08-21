#!/bin/bash

echo "╔════════════════════════════════════════════╗"
echo "║ 🚀 ComercialX Swagger Sync Cockpit v1.0   ║"
echo "╚════════════════════════════════════════════╝"

# 📍 Buscar swagger.yaml
SWAGGER_PATH=$(find . -name "swagger.yaml" | head -n 1)

if [ -z "$SWAGGER_PATH" ]; then
  echo "❌ No se encontró swagger.yaml en el proyecto."
  exit 1
fi

echo "🔍 Swagger encontrado en: $SWAGGER_PATH"

# 📁 Crear carpeta docs si no existe
mkdir -p docs

# 📦 Mover swagger.yaml a docs/
cp "$SWAGGER_PATH" docs/swagger.yaml
echo "📦 Copiado a docs/swagger.yaml"

# 🧠 Actualizar ruta en index.html si es necesario
INDEX_FILE="docs/index.html"
if grep -q "url:" "$INDEX_FILE"; then
  sed -i.bak "s|url: .*|url: 'swagger.yaml',|" "$INDEX_FILE"
  echo "🛠️ Ruta actualizada en index.html"
else
  echo "⚠️ No se encontró línea 'url:' en index.html"
fi

# 📜 Log final
echo "✅ Sincronización completa. Revisa docs/index.html y publica en GitHub Pages."
