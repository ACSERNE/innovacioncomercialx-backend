#!/bin/bash
set -e

timestamp=$(date +"%Y-%m-%dT%H-%M-%S")
log_dir="./logs"
mkdir -p "$log_dir"
log_file="$log_dir/rebuild-transacciones-$timestamp.log"

echo "🧠 Iniciando reconstrucción de tabla 'transacciones'" | tee -a "$log_file"

# ✅ Paso 1: Verificar si existe la tabla
table_check=$(docker exec -it postgres-container psql -U postgres -d innovacion-db -tAc "SELECT to_regclass('public.transacciones');" | tr -d '\r')

if [ "$table_check" = "transacciones" ]; then
  echo "✅ Tabla 'transacciones' detectada" | tee -a "$log_file"
else
  echo "⚠️ Tabla 'transacciones' NO existe. Aplicando migraciones..." | tee -a "$log_file"
  NODE_ENV=development npx sequelize-cli db:migrate | tee -a "$log_file"
fi

# 🔍 Paso 2: Validar tipo de columna 'tipo'
tipo_check=$(docker exec -it postgres-container psql -U postgres -d innovacion-db -tAc "
SELECT udt_name FROM information_schema.columns 
WHERE table_name = 'transacciones' AND column_name = 'tipo';
" | tr -d '\r')

if [[ "$tipo_check" == enum_* ]]; then
  echo "✅ Campo 'tipo' ya está en ENUM ($tipo_check)" | tee -a "$log_file"
else
  echo "🛠 Reparando campo 'tipo' a ENUM..." | tee -a "$log_file"
  node scripts/fix/fix-enum-transacciones.js | tee -a "$log_file"
fi

# 🌱 Paso 3: Ejecutar seeds
echo "🌱 Ejecutando seeds demo..." | tee -a "$log_file"
NODE_ENV=development npx sequelize-cli db:seed:all | tee -a "$log_file"

echo "✅ Proceso completo. Log técnico guardado en: $log_file"
