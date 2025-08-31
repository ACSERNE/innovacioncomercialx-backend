#!/bin/bash

echo "🛑 Deteniendo y eliminando contenedores antiguos de backend y DB..."
docker-compose stop backend postgres
docker-compose rm -f backend

echo "📦 Levantando PostgreSQL..."
docker-compose up -d postgres

echo "⏳ Esperando a que PostgreSQL esté disponible..."
until docker-compose exec postgres pg_isready -U $DB_USER >/dev/null 2>&1; do
  sleep 1
done
echo "✅ PostgreSQL está listo."

echo "📌 Creando base de datos limpia..."
docker-compose exec postgres psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker-compose exec postgres psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

echo "🔨 Levantando backend..."
docker-compose up -d backend

echo "⏳ Esperando a que el backend esté listo..."
sleep 5

echo "🔨 Aplicando migraciones y seeds..."
docker-compose exec backend npx sequelize-cli db:migrate --config config/config.js
docker-compose exec backend npx sequelize-cli db:seed:all --config config/config.js

echo "✅ Backend y base de datos reiniciados correctamente."
