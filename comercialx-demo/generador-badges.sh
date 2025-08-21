#!/bin/bash

# 🛡️ Generador de badges SVG desde badges.json
JSON="badges.json"
DIR="badges"

mkdir -p "$DIR"

echo "🔁 Generando badges SVG desde $JSON..."

jq -c '.badges[]' "$JSON" | while read -r badge; do
  PAIS=$(echo "$badge" | jq -r '.pais')
  COLOR=$(echo "$badge" | jq -r '.color')
  TEXTO=$(echo "$badge" | jq -r '.texto')
  ARCHIVO=$(echo "$badge" | jq -r '.archivo')

  echo "📦 $PAIS → $ARCHIVO"

  cat <<SVG > "$ARCHIVO"
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
  <rect width="100" height="20" fill="$COLOR"/>
  <text x="50%" y="14" fill="#fff" font-size="12" text-anchor="middle">$TEXTO</text>
</svg>
SVG
done

echo "✅ Badges generados en $DIR/"
