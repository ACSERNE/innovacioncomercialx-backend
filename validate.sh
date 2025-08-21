#!/bin/bash

mkdir -p docs

# Validación de export.json
curl -s -o /dev/null -w "%{http_code}" https://acserne.github.io/innovacioncomercialx-backend/export.json | grep -q 200 && backend="OK" || backend="FAIL"

# Validación de export.zip
curl -s -o /dev/null -w "%{http_code}" https://acserne.github.io/innovacioncomercialx-backend/export.zip | grep -q 200 && exportzip="OK" || exportzip="FAIL"

# Validación de Docker local
docker ps | grep -q comercialx && docker="OK" || docker="WARN"

# Generar badges SVG
for module in backend exportzip docker; do
  status="${!module}"
  color="red"; [[ $status == "OK" ]] && color="green"; [[ $status == "WARN" ]] && color="orange"
  cat > "docs/badge-$module.svg" <<EOF2
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
  <rect width="120" height="20" fill="#555"/>
  <rect x="60" width="60" height="20" fill="$color"/>
  <text x="30" y="14" fill="#fff" font-family="Verdana" font-size="11">$module</text>
  <text x="90" y="14" fill="#fff" font-family="Verdana" font-size="11">$status</text>
</svg>
EOF2
done

# Generar status.json
cat > docs/status.json <<EOF3
{
  "backend": "$backend",
  "exportzip": "$exportzip",
  "docker": "$docker",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF3

echo "✅ Validación completada. Badges y status.json generados en docs/"
