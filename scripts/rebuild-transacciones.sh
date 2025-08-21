#!/bin/bash
set -e

timestamp=$(date +"%Y-%m-%dT%H-%M-%S")
log_dir="./logs"
mkdir -p "$log_dir"
log_file="$log_dir/rebuild-transacciones-$timestamp.log"

echo "🔄 Iniciando reconstrucción de tabla 'Transacciones'" | tee -a "$log_file"

# ✅ Paso 1: Verificar si existe la tabla
table_check=$(docker exec -i backend-postgres-1 psql -U postgres -d innovacion_db -tAc "SELECT to_regclass('public.\"Transacciones\"');" | tr -d '\r')

if [ "$table_check" = "Transacciones" ]; then
  echo "✅ Tabla 'Transacciones' detectada" | tee -a "$log_file"
else
  echo "⚠️ Tabla 'Transacciones' NO existe. Aplicando migraciones..." | tee -a "$log_file"
  NODE_ENV=development npx sequelize-cli db:migrate | tee -a "$log_file"
fi

# ✅ Paso 2: Validar tipo de columna 'tipo'
tipo_check=$(docker exec -i backend-postgres-1 psql -U postgres -d innovacion_db -tAc "
SELECT udt_name FROM information_schema.columns
WHERE table_name = 'Transacciones' AND column_name = 'tipo';
" | tr -d '\r')

if [[ "$tipo_check" == enum_* ]]; then
  echo "✅ Campo 'tipo' ya está en ENUM ($tipo_check)" | tee -a "$log_file"
else
  echo "🔧 Reparando campo 'tipo' a ENUM..." | tee -a "$log_file"
  NODE_ENV=development npx sequelize-cli db:migrate:undo:all | tee -a "$log_file"
  NODE_ENV=development npx sequelize-cli db:migrate | tee -a "$log_file"
fi

# ✅ Paso 3: Cargar datos de prueba
echo "🌱 Ejecutando seeds demo..." | tee -a "$log_file"
NODE_ENV=development npx sequelize-cli db:seed:all | tee -a "$log_file"

echo "✅ Proceso completo. Log técnico guardado en: $log_file"

