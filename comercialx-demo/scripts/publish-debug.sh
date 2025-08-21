#!/bin/bash

echo "🧪 Diagnóstico de publicación multiplataforma..."

CSV="publish-debug.csv"
JSON="publish-debug.json"
BADGE="dashboard/badges/publish-debug.svg"
STATUS="OK"
ENTORNOS=("github-pages" "netlify" "railway")
URLS=(
  "https://acserne.github.io/comercialx-demo/"
  "https://comercialx-demo.netlify.app/"
  "https://comercialx-demo.up.railway.app/"
)

echo "entorno,url,codigo_http,estado" > "$CSV"
LOG="{\"timestamp\":\"$(date -Iseconds)\",\"resultados\":["

for i in "${!ENTORNOS[@]}"; do
  entorno="${ENTORNOS[$i]}"
  url="${URLS[$i]}"
  codigo=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  estado="OK"

  case "$codigo" in
    200) estado="OK" ;;
    404) estado="Not Found" ; STATUS="FAIL" ;;
    403) estado="Forbidden" ; STATUS="FAIL" ;;
    502|503) estado="Bad Gateway" ; STATUS="FAIL" ;;
    *) estado="Unknown" ; STATUS="FAIL" ;;
  esac

  echo "$entorno,$url,$codigo,$estado" >> "$CSV"
  LOG="$LOG{\"entorno\":\"$entorno\",\"url\":\"$url\",\"codigo_http\":\"$codigo\",\"estado\":\"$estado\"},"
done

LOG="${LOG::-1}]}" # Elimina la última coma
echo "$LOG" > "$JSON"

# Generar badge SVG
case "$STATUS" in
  OK)
    LABEL="Publish_OK"
    COLOR="brightgreen"
    ;;
  FAIL)
    LABEL="Publish_FAIL"
    COLOR="red"
    ;;
  *)
    LABEL="Publish_Warning"
    COLOR="yellow"
    ;;
esac

curl -s -o "$BADGE" "https://img.shields.io/badge/Publish-$LABEL-$COLOR.svg"

echo "✅ Diagnóstico completado. Estado global: $STATUS"
