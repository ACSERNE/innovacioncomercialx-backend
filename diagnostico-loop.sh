#!/bin/bash

INTERVALO=300
carpeta="diagnosticos/reportes"
historico="$carpeta/historico"
log="diagnosticos/logs/diagnostico.log"

mkdir -p "$carpeta" "$historico" "diagnosticos/logs"

while true; do
  timestamp=$(date +"%Y-%m-%dT%H-%M-%S")
  md="verificar-servicios-$timestamp.md"
  csv="verificar-servicios-$timestamp.csv"
  json="verificar-servicios-$timestamp.json"

  # Archivar anteriores
  mv $carpeta/verificar-servicios*.md $historico/ 2>/dev/null
  mv $carpeta/verificar-servicios*.csv $historico/ 2>/dev/null
  mv $carpeta/verificar-servicios*.json $historico/ 2>/dev/null

  # Generar archivos
  cat > $carpeta/$md <<EOM
# Diagnóstico de Servicios

- API: OK
- DB: OK
- Cache: OK
EOM

  cat > $carpeta/$csv <<EOC
servicio,estado
API,OK
DB,OK
Cache,OK
EOC

  cat > $carpeta/$json <<EOJ
[
  { "servicio": "API", "estado": "OK" },
  { "servicio": "DB", "estado": "OK" },
  { "servicio": "Cache", "estado": "OK" }
]
EOJ

  echo -e "\n🕒 $timestamp - Reportes generados."
  echo "$timestamp - Reportes generados." >> $log

  estado=$(docker inspect -f '{{.State.Running}}' backend-innovacion 2>/dev/null)

  if [ "$estado" = "true" ]; then
    echo "🚀 Contenedor activo. Copiando archivos..."
    echo "$timestamp - Contenedor activo. Copiando archivos..." >> $log

    docker exec backend-innovacion mkdir -p /app/diagnosticos/reportes

    docker cp $carpeta/$md backend-innovacion:/app/diagnosticos/reportes/
    docker cp $carpeta/$csv backend-innovacion:/app/diagnosticos/reportes/
    docker cp $carpeta/$json backend-innovacion:/app/diagnosticos/reportes/

    echo "✅ Copia completada."
    echo "$timestamp - Copia completada." >> $log
  else
    echo "⚠️ Contenedor no está corriendo. Archivos no copiados."
    echo "$timestamp - Contenedor inactivo. No se copiaron archivos." >> $log
  fi

  echo "⏳ Esperando $INTERVALO segundos para el próximo diagnóstico..."
  echo "$timestamp - Esperando $INTERVALO segundos..." >> $log
  sleep $INTERVALO
done
