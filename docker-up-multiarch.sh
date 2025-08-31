#!/bin/bash
set -e

echo "🛑 Deteniendo contenedores antiguos..."
docker-compose down -v

echo "🔨 Construyendo imágenes multi-arch..."
docker buildx create --use || true
docker buildx build --push --platform linux/amd64,linux/arm64 \
  -t backend-comercialx-backend ./backend
docker buildx build --push --platform linux/amd64,linux/arm64 \
  -t frontend-web ./frontend-web
docker buildx build --push --platform linux/amd64,linux/arm64 \
  -t frontend-mobile ./frontend-mobile

echo "🚀 Levantando todos los servicios..."
docker-compose up -d

echo "⏳ Esperando PostgreSQL..."
until docker exec postgres-innovacion pg_isready -U $DB_USER; do
  sleep 2
done

echo "✅ Ejecutando migraciones y seeders..."
docker exec -it comercialx-backend npx sequelize-cli db:migrate
docker exec -it comercialx-backend npx sequelize-cli db:seed:all

echo "🌐 Todo levantado en multi-arch:"
echo "Backend: http://localhost:5002"
echo "Frontend Web: http://localhost:3000"
echo "Frontend Móvil (Expo): http://localhost:19006"
echo "pgAdmin: http://localhost:8080"
