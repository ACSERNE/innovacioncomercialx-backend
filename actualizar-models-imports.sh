#!/bin/bash

# Nombre del archivo de log
LOG_FILE="modificaciones_models.log"
BACKUP_DIR="./backup_models"

# Crear carpeta de backup si no existe
mkdir -p "$BACKUP_DIR"

# Limpiar log previo
> "$LOG_FILE"

echo "🔍 Buscando archivos con require('./models')..."

# Buscar todos los archivos .js (excepto node_modules)
FILES=$(grep -rl --exclude-dir=node_modules "require('./models')" . --include="*.js")

if [ -z "$FILES" ]; then
  echo "✅ No se encontraron archivos con require('./models')"
  exit 0
fi

echo "📝 Archivos encontrados:"
echo "$FILES"
echo

# Reemplazar y guardar backup
for file in $FILES; do
  echo "➡️ Modificando: $file" | tee -a "$LOG_FILE"

  # Crear backup del archivo original
  cp "$file" "$BACKUP_DIR/$(basename "$file")"

  # Reemplazar require('./models') por require('./models/index.cjs')
  sed -i "s|require('./models')|require('./models/index.cjs')|g" "$file"
done

echo ""
echo "✅ Modificaciones completadas."
echo "📦 Backup guardado en: $BACKUP_DIR"
echo "🗒️ Detalles en: $LOG_FILE"
