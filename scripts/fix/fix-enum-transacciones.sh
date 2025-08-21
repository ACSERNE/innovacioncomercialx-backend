#!/bin/bash

echo "🔧 Iniciando reparación del ENUM 'enum_transacciones_tipo'..."

# Ruta del log con timestamp
LOG_PATH="logs/fix-enum-transacciones-$(date +"%Y-%m-%dT%H-%M-%S").log"

# Configuración manual: ajusta estos valores según tu entorno
DB_NAME="nombre_de_tu_bd"
DB_USER="postgres"

# Verificar que psql esté disponible
if ! command -v psql >/dev/null 2>&1; then
  echo "⛔ Error: 'psql' no está disponible en el entorno. Asegúrate de que esté instalado y en el PATH." | tee -a "$LOG_PATH"
  exit 1
fi

# Lista de valores esperados en el ENUM
EXPECTED_VALUES=("compra" "venta" "devolucion")

# Verificación y reparación
for value in "${EXPECTED_VALUES[@]}"; do
  echo "⏳ Verificando si '$value' está presente..." | tee -a "$LOG_PATH"

  RESULT=$(psql -U "$DB_USER" -d "$DB_NAME" -tAc "SELECT EXISTS (
    SELECT 1 FROM unnest(enum_range(NULL::enum_transacciones_tipo)) AS v WHERE v = '$value'
  );")

  if [[ "$RESULT" != "t" ]]; then
    echo "⚠️ Valor '$value' no está presente. Agregando..." | tee -a "$LOG_PATH"
    psql -U "$DB_USER" -d "$DB_NAME" -c "ALTER TYPE enum_transacciones_tipo ADD VALUE IF NOT EXISTS '$value';" >> "$LOG_PATH" 2>&1
    echo "✅ Valor '$value' agregado exitosamente." | tee -a "$LOG_PATH"
  else
    echo "✅ Valor '$value' ya existe en el ENUM." | tee -a "$LOG_PATH"
  fi
done

echo "📁 Reparación finalizada. Log guardado en: $LOG_PATH"