#!/bin/bash
URL_BASE="https://ACSERNE.github.io/comercialx-demo"
ARCHIVOS=(
  index.html
  dashboard-estado.html
  dashboard.csv
  visor-chile.html
  log-chile.html
  badges/chile.svg
)

echo "🔍 Validando artefactos remotos en $URL_BASE"
for archivo in "${ARCHIVOS[@]}"; do
  url="$URL_BASE/$archivo"
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [[ "$status" == "200" ]]; then
    echo "✅ $archivo disponible en remoto"
  else
    echo "❌ $archivo no responde (HTTP $status)"
  fi
done
