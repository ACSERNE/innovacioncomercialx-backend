#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
USER_NAME="Test User"
USER_EMAIL="testuser@example.com"
USER_ROLE="auditor"

# 🧼 Limpieza si se pasa --clean
if [[ "$1" == "--clean" ]]; then
  echo "🧹 Limpiando datos de test..."

  rm -rf "$SCRIPT_DIR/users/$USER_NAME"
  rm -f "$SCRIPT_DIR/reports/$USER_NAME-$USER_ROLE.md"
  sed -i "/$USER_EMAIL/d" "$SCRIPT_DIR/../data/usuarios.csv" 2>/dev/null
  sed -i "/$USER_NAME/d" "$SCRIPT_DIR/logs/actions.log" 2>/dev/null

  echo "✅ Limpieza completada."
  exit 0
fi

echo "🧪 Iniciando test de onboarding para $USER_NAME..."

# Ejecutar registro
bash "$SCRIPT_DIR/register-user.sh" --name "$USER_NAME" --email "$USER_EMAIL" --role "$USER_ROLE"

# Verificaciones
echo "🔍 Verificando estructura..."

# 1. Carpeta de usuario
USER_FOLDER="$SCRIPT_DIR/users/$USER_NAME/$USER_ROLE"
if [ -d "$USER_FOLDER" ]; then
  echo "✅ Carpeta creada: $USER_FOLDER"
else
  echo "❌ Carpeta no encontrada: $USER_FOLDER"
fi

# 2. Reporte Markdown
REPORT_FILE="$SCRIPT_DIR/reports/$USER_NAME-$USER_ROLE.md"
if [ -f "$REPORT_FILE" ]; then
  echo "✅ Reporte generado: $REPORT_FILE"
else
  echo "❌ Reporte no encontrado: $REPORT_FILE"
fi

# 3. Log de acción
LOG_FILE="$SCRIPT_DIR/logs/actions.log"
if [ -f "$LOG_FILE" ] && grep -q "$USER_NAME" "$LOG_FILE"; then
  echo "✅ Acción registrada en log"
else
  echo "❌ Acción no registrada en log"
fi

# 4. Registro en CSV
CSV_FILE="$SCRIPT_DIR/../data/usuarios.csv"
if [ -f "$CSV_FILE" ] && grep -q "$USER_EMAIL" "$CSV_FILE"; then
  echo "✅ Usuario registrado en CSV"
else
  echo "❌ Usuario no registrado en CSV"
fi

echo "🧪 Test de onboarding finalizado."
