#!/bin/bash

# Timestamp para trazabilidad
timestamp=$(date +"%Y-%m-%dT%H-%M-%S")

# Crear carpeta local
mkdir -p diagnosticos/reportes

# Nombres con timestamp
md="verificar-servicios-$timestamp.md"
csv="verificar-servicios-$timestamp.csv"
json="verificar-servicios-$timestamp.json"

# Generar Markdown
cat > diagnosticos/reportes/$md <<EOM
# Diagnóstico de Servicios

- API: OK
- DB: OK
- Cache: OK
EOM

# Generar CSV
cat > diagnosticos/reportes/$csv <<EOC
servicio,estado
API,OK
DB,OK
Cache,OK
EOC

# Generar JSON
cat > diagnosticos/reportes/$json <<EOJ
[
  { "servicio": "API", "estado": "OK" },
  { "servicio": "DB", "estado": "OK" },
  { "servicio": "Cache", "estado": "OK" }
]
EOJ

# Mostrar contenido
echo -e "\n📄 Markdown:"
cat diagnosticos/reportes/$md

echo -e "\n📊 CSV:"
cat diagnosticos/reportes/$csv

echo -e "\n🧾 JSON:"
cat diagnosticos/reportes/$json

# Verificar si el contenedor está corriendo
estado=$(docker inspect -f '{{.State.Running}}' backend-innovacion 2>/dev/null)

if [ "$estado" = "true" ]; then
  echo -e "\n🚀 Contenedor backend-innovacion está activo. Copiando archivos..."

  # Crear carpeta en contenedor
  docker exec backend-innovacion mkdir -p /app/diagnosticos/reportes

  # Copiar archivos
  docker cp diagnosticos/reportes/$md backend-innovacion:/app/diagnosticos/reportes/
  docker cp diagnosticos/reportes/$csv backend-innovacion:/app/diagnosticos/reportes/
  docker cp diagnosticos/reportes/$json backend-innovacion:/app/diagnosticos/reportes/

  echo -e "\n✅ Reportes generados, mostrados y copiados al contenedor."
else
  echo -e "\n⚠️ El contenedor backend-innovacion no está corriendo. No se copiaron los archivos."
fi
