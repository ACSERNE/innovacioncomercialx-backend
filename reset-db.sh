#!/bin/bash

DB_NAME="innovacion_db"
DB_USER="postgres"

echo "⚠️  Este script borrará la base de datos '$DB_NAME'. Asegúrate de tener respaldo si es necesario."
read -p "¿Querés continuar? (s/n): " RESPUESTA

if [[ "$RESPUESTA" != "s" ]]; then
  echo "Abortado."
  exit 1
fi

echo "🗑️ Borrando base de datos $DB_NAME..."
psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"

echo "🛠️ Creando base de datos $DB_NAME..."
psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

echo "🚀 Ejecutando migraciones..."
npx sequelize-cli db:migrate --env development

echo "📦 Ejecutando seeds..."
npx sequelize-cli db:seed:all --env development

echo "✅ Proceso finalizado."
