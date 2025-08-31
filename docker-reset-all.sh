#!/bin/bash

echo "🛑 Deteniendo y eliminando todos los contenedores antiguos..."
docker-compose down -v

echo "📦 Reconstruyendo imágenes y levantando todos los servicios..."
docker-compose up -d --build postgres pgadmin backend frontend-web frontend-mobile

echo "⏳ Esperando a que PostgreSQL esté disponible..."
until docker-compose exec postgres pg_isready -U $DB_USER >/dev/null 2>&1; do
  sleep 1
done
echo "✅ PostgreSQL está listo."

echo "📌 Creando base de datos limpia..."
docker-compose exec postgres psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker-compose exec postgres psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

echo "⏳ Esperando 5 segundos para que el backend se levante..."
sleep 5

echo "🔨 Aplicando migraciones y seeds..."
docker-compose exec backend npx sequelize-cli db:migrate --config config/config.js
docker-compose exec backend npx sequelize-cli db:seed:all --config config/config.js

echo "✅ Todos los servicios reiniciados correctamente."
echo "🔹 Backend: http://localhost:5002"
echo "🔹 Frontend Web: http://localhost:3000"
echo "🔹 Frontend Móvil (Expo): http://localhost:19006"
echo "🔹 pgAdmin: http://localhost:8080"
