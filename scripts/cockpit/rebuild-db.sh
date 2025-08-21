#!/bin/bash

echo "🧱 Iniciando reconstrucción estructural de la base innovacion-db..."

TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
LOG="logs/rebuild-db-$TIMESTAMP.log"
DB_NAME="innovacion-db"
DB_USER="postgres"
PG_CONTAINER="postgres-container"

echo "📁 Log técnico guardado en: $LOG"
touch "$LOG"

# Paso 1: Drop + Create database
echo "🧹 Eliminando y recreando base $DB_NAME..." | tee -a "$LOG"
docker exec -i $PG_CONTAINER psql -U $DB_USER <<EOF >> "$LOG" 2>&1
DROP DATABASE IF EXISTS "$DB_NAME";
CREATE DATABASE "$DB_NAME";
EOF

if [[ $? -ne 0 ]]; then
  echo -e "\033[1;31m⛔ Error: no se pudo recrear la base $DB_NAME. Revisa permisos o el contenedor.\033[0m" | tee -a "$LOG"
  exit 1
fi

# Paso 2: Ejecutar migraciones
echo "📦 Ejecutando migraciones..." | tee -a "$LOG"
npx sequelize-cli db:migrate >> "$LOG" 2>&1

# Paso 3: Reparar ENUM tipo
echo "🧬 Ejecutando fixer de ENUM tipo..." | tee -a "$LOG"
node scripts/fix/fix-enum-transacciones.js >> "$LOG" 2>&1

# Paso 4: Validación estructural previa
echo "🔍 Ejecutando health-check estructural..." | tee -a "$LOG"
node scripts/validators/seed-health-check.js >> "$LOG" 2>&1

# Paso 5: Ejecutar seeds
echo "🌱 Ejecutando seeds demo..." | tee -a "$LOG"
npx sequelize-cli db:seed:all >> "$LOG" 2>&1

if [[ $? -eq 0 ]]; then
  echo -e "\033[1;32m✅ Base reconstruida y seeds aplicados exitosamente.\033[0m" | tee -a "$LOG"
else
  echo -e "\033[1;31m⚠️ Error en ejecución de seeds. Revisá el log completo.\033[0m" | tee -a "$LOG"
fi
