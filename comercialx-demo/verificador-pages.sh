#!/bin/bash

# 🌍 Configuración base
BASE_URL="https://acserne.github.io/comercialx-demo"
MODULOS=("chile" "mexico" "espana")
ARTEFACTOS=("visor" "log" "embed")

echo "🔍 Verificando artefactos publicados en GitHub Pages..."
echo "🌐 Base: $BASE_URL"
echo "--------------------------------------------"

for pais in "${MODULOS[@]}"; do
  echo "📦 Módulo: ${pais^}"
  for tipo in "${ARTEFACTOS[@]}"; do
    URL="$BASE_URL/${tipo}-$pais.html"
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    if [ "$STATUS" == "200" ]; then
      echo "✅ $tipo-$pais.html → OK"
    else
      echo "❌ $tipo-$pais.html → ERROR $STATUS"
    fi
  done
  echo "--------------------------------------------"
done

# Validación comunitaria
echo "📘 Artefactos comunitarios:"
for file in visor-comunitario.html log-monitor.html embed-docker.html; do
  URL="$BASE_URL/$file"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  if [ "$STATUS" == "200" ]; then
    echo "✅ $file → OK"
  else
    echo "❌ $file → ERROR $STATUS"
  fi
done

echo "🛡️ Validación completa."
