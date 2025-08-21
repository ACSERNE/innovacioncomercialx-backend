#!/bin/bash
set -e

echo "🚀 Iniciando auditoría cockpitizada de rutas..."

# Paths
VALIDATOR="backend/audit/routes/routes-validator.js"
EXPORTER="backend/audit/routes/routes-exporter.js"
LOG="backend/audit/routes/logs/routes-validation.md"
MAP_MD="backend/audit/routes/routes-map.md"
MAP_HTML="backend/audit/routes/routes-map.html"

# 1. Validación visual
echo "🧪 Ejecutando validador de rutas..."
node "$VALIDATOR"

# 2. Mostrar log visual
echo "📋 Log de validación:"
cat "$LOG"

# 3. Generar tabla Markdown (routes-map.md)
echo "🛠️ Generando tabla Markdown..."
cp "$LOG" "$MAP_MD"

# 4. Generar tabla HTML con badges (routes-map.html)
echo "🎨 Generando tabla HTML con badges..."
echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Routes Map</title></head><body><pre>" > "$MAP_HTML"
cat "$MAP_MD" >> "$MAP_HTML"
echo "</pre></body></html>" >> "$MAP_HTML"

# 5. Exportar CSV y JSON si existe exporter
if [ -f "$EXPORTER" ]; then
  echo "📦 Exportando CSV y JSON..."
  node "$EXPORTER"
fi

# 6. Abrir HTML si en entorno gráfico
if command -v xdg-open &> /dev/null; then
  xdg-open "$MAP_HTML"
elif command -v start &> /dev/null; then
  start "$MAP_HTML"
fi

echo "✅ Auditoría completada. Visuales generados:"
echo " - $MAP_MD"
echo " - $MAP_HTML"
echo " - $LOG"
