#!/bin/bash

mkdir -p badges

echo "🔁 Generando badges SVG y CSV sin jq..."

# CSV de auditoría
echo "Pais,Entorno,Ruta,Log,Embed,Badge" > dashboard.csv

# Datos embebidos directamente
declare -A colores=(
  [chile]="#0033A0"
  [mexico]="#006847"
  [espana]="#AA151B"
  [docker]="#0db7ed"
)

declare -A textos=(
  [chile]="Chile ✅"
  [mexico]="México ✅"
  [espana]="España ✅"
  [docker]="Docker ✅"
)

for pais in chile mexico espana; do
  archivo="badges/$pais.svg"
  color="${colores[$pais]}"
  texto="${textos[$pais]}"

  echo "📦 Generando $archivo"
  cat <<SVG > "$archivo"
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
  <rect width="100" height="20" fill="$color"/>
  <text x="50%" y="14" fill="#fff" font-size="12" text-anchor="middle">$texto</text>
</svg>
SVG

  # Agregar línea al CSV
  echo "${texto%,*},$(case $pais in chile)Producción;;mexico)Staging;;espana)QA;;esac),visor-$pais.html,log-$pais.html,embed-$pais.html,$archivo" >> dashboard.csv
done

# Docker badge
cat <<SVG > badges/docker.svg
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
  <rect width="100" height="20" fill="${colores[docker]}"/>
  <text x="50%" y="14" fill="#fff" font-size="12" text-anchor="middle">${textos[docker]}</text>
</svg>
SVG

echo "✅ Badges y dashboard.csv generados sin jq"
