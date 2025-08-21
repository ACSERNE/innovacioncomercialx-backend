#!/bin/bash

echo "🔍 Iniciando validación técnica de la columna 'tipo' en Transacciones..."

SCRIPT_PATH="scripts/validators/validate-transacciones-tipo.js"
LOG_PATH="logs/validacion-tipo-$(date +"%Y-%m-%dT%H-%M-%S").log"

# Ejecutar el validador y guardar salida en log
node $SCRIPT_PATH > "$LOG_PATH" 2>&1
EXIT_CODE=$?

# Interpretar resultado
if [ $EXIT_CODE -eq 0 ]; then
  echo -e "\033[1;32m✅ Validación exitosa. ENUM correctamente configurado.\033[0m"
else
  echo -e "\033[1;31m⛔ ERROR en la validación. Revisa el log: $LOG_PATH\033[0m"
fi

exit $EXIT_CODE
