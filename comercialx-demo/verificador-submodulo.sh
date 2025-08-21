#!/bin/bash
mkdir -p badges

estado="OK"
mensaje="Submódulo OK"
color="#4c1"

# Verifica si hay submódulos declarados
if [ -f .gitmodules ]; then
  while read -r linea; do
    if [[ "$linea" == path* ]]; then
      path=$(echo "$linea" | cut -d'=' -f2 | xargs)
      if [ ! -d "$path/.git" ] && [ ! -f "$path/.git" ]; then
        estado="ERROR"
        mensaje="Submódulo roto: $path"
        color="#e05d44"
        break
      fi
    fi
  done < .gitmodules
else
  estado="WARNING"
  mensaje="Sin submódulos declarados"
  color="#dfb317"
fi

# Genera el badge SVG dinámico
cat <<SVG > badges/badge-submodule.svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20">
  <rect width="200" height="20" fill="$color"/>
  <text x="100" y="14" fill="#fff" font-family="Verdana" font-size="11" text-anchor="middle">
    $mensaje
  </text>
</svg>
SVG

# Log técnico federado
timestamp=$(date +"%Y-%m-%d %H:%M:%S")
echo "[$timestamp] Estado: $estado – $mensaje" >> log-submodulo.txt

echo "✅ Badge generado: $estado – $mensaje"
