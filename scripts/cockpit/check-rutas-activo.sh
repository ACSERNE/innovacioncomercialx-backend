#!/bin/bash
echo "🔍 Verificando rutas activas del backend en http://localhost:5002"
echo "=============================================="

declare -a rutas=("users" "productos" "transacciones")

for ruta in "${rutas[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5002/$ruta)

  case $status in
    200)
      echo "✅ /$ruta responde correctamente (200 OK)"
      ;;
    404)
      echo "⚠️ /$ruta no está registrada o no tiene handler GET (404)"
      ;;
    500)
      echo "❌ /$ruta lanza error interno (500)"
      ;;
    *)
      echo "❓ /$ruta responde con código desconocido: $status"
      ;;
  esac
done

echo "📁 Diagnóstico completo - $(date '+%Y-%m-%d %H:%M:%S')"