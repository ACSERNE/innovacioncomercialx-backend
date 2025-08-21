#!/bin/bash

echo "🔍 Validando build cockpitizado..."

STATUS="OK"
CSV="build-status.csv"
BADGE_DIR="dashboard/badges"
mkdir -p "$BADGE_DIR"

# Países y entornos federados
PAISES=("CL" "MX" "ES")
ENTORNOS=("local" "cloud" "pages" "netlify")

# Validaciones técnicas
if ! grep -q '"build"' package.json; then
  echo "❌ Falta script 'build' en package.json"
  STATUS="FAIL"
fi

if [ ! -f "dist/index.html" ]; then
  echo "❌ No se generó dist/index.html"
  STATUS="FAIL"
fi

# Exportar CSV federado
echo "pais,entorno,estado" > "$CSV"
for pais in "${PAISES[@]}"; do
  for entorno in "${ENTORNOS[@]}"; do
    echo "$pais,$entorno,$STATUS" >> "$CSV"
  done
done

# Generar badges SVG dinámicos
for pais in "${PAISES[@]}"; do
  case "$STATUS" in
    OK)
      COLOR="brightgreen"
      LABEL="Build_OK"
      ;;
    FAIL)
      COLOR="red"
      LABEL="Failure"
      ;;
    *)
      COLOR="yellow"
      LABEL="Warning"
      ;;
  esac
  curl -s -o "$BADGE_DIR/$pais.svg" "https://img.shields.io/badge/$pais-$LABEL-$COLOR.svg"
done

echo "✅ Validación completada. Estado: $STATUS"
