#!/bin/bash

echo "🛑 Deteniendo y eliminando contenedores antiguos..."
docker-compose down -v

echo "📦 Levantando todos los servicios..."
docker-compose up -d postgres backend frontend-web frontend-mobile pgadmin

echo "⏳ Esperando a que PostgreSQL esté disponible..."
until docker-compose exec -T postgres pg_isready -U $DB_USER >/dev/null 2>&1; do
  sleep 1
done
echo "✅ PostgreSQL está listo."

echo "🔨 Aplicando migraciones..."
docker-compose exec backend npx sequelize-cli db:migrate --config config/config.js

echo "🔨 Aplicando seeds..."
docker-compose exec backend npx sequelize-cli db:seed:all --config config/config.js

echo "✅ Todos los servicios y la base de datos están listos."
echo "Backend: http://localhost:5002"
echo "Frontend Web: http://localhost:3001"
echo "Frontend Móvil (Expo): http://localhost:19006"
echo "pgAdmin: http://localhost:8080"
