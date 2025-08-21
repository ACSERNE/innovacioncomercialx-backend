#!/bin/bash

# Validación de jq
if ! command -v jq &> /dev/null; then
  echo "❌ Error: jq no está instalado. Instálalo para continuar."
  exit 1
fi

# Validación de archivo fuente
if [ ! -f dashboard-maestro.json ]; then
  echo "❌ Error: dashboard-maestro.json no existe en el directorio actual."
  exit 1
fi

# Generación del CSV
jq -r '
  .dashboard[] |
  [.pais, .entorno, .estado, .version, .url] |
  @csv
' dashboard-maestro.json > dashboard.csv

# Validación de contenido generado
if [ ! -s dashboard.csv ]; then
  echo "⚠️ Advertencia: dashboard.csv está vacío. Revisa el contenido de dashboard-maestro.json."
  exit 1
fi

echo "✅ dashboard.csv generado correctamente desde dashboard-maestro.json"