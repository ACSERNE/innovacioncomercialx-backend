#!/bin/bash

POSTGRES_CONTAINER="postgres-innovacion"
CONTAINER="backend-innovacion"
DB_NAME="innovacion_db"

echo "🛑 Cerrando conexiones activas a la base de datos $DB_NAME..."
docker exec -it $POSTGRES_CONTAINER sh -c "psql -U postgres -d postgres -c \"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME';\""

echo "💥 Eliminando la base de datos $DB_NAME..."
docker exec -it $POSTGRES_CONTAINER sh -c "psql -U postgres -d postgres -c \"DROP DATABASE IF EXISTS $DB_NAME;\""

echo "📦 Creando la base de datos $DB_NAME..."
docker exec -it $POSTGRES_CONTAINER sh -c "psql -U postgres -d postgres -c \"CREATE DATABASE $DB_NAME;\""

echo "🚀 Ejecutando migraciones..."
docker exec -it $CONTAINER npx sequelize-cli db:migrate

echo "🌱 Insertando datos seed..."
docker exec -it $CONTAINER npx sequelize-cli db:seed:all

echo "✅ Base de datos $DB_NAME reiniciada correctamente."
