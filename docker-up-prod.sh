#!/bin/bash
set -e

echo "🛑 Deteniendo contenedores anteriores..."
docker-compose down -v

echo "🔨 Construyendo imágenes en producción..."
docker-compose build

echo "🚀 Levantando todos los servicios..."
docker-compose up -d

echo "⏳ Esperando que PostgreSQL esté listo..."
until docker exec postgres-innovacion pg_isready -U $DB_USER; do
  sleep 2
done

echo "✅ PostgreSQL listo. Ejecutando migraciones y seeders..."
docker exec -it comercialx-backend npx sequelize-cli db:migrate
docker exec -it comercialx-backend npx sequelize-cli db:seed:all

echo "🌐 Servicios levantados en producción:"
echo "Backend: http://localhost:5002"
echo "Frontend Web: http://localhost:3000"
echo "Frontend Móvil (Expo): http://localhost:19006"
echo "pgAdmin: http://localhost:8080"
