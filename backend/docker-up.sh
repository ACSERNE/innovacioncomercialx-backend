#!/bin/bash
set -e

echo "🛑 Deteniendo y eliminando contenedores antiguos..."
docker-compose down -v

echo "🔨 Construyendo imágenes y levantando servicios..."
docker-compose build
docker-compose up -d

echo "⏳ Esperando a que PostgreSQL esté disponible..."
# Espera hasta que la DB responda
until docker exec -i $(docker ps -q -f name=postgres) pg_isready -U postgres > /dev/null 2>&1; do
  sleep 2
  echo "⚠️  Esperando DB..."
done

echo "✅ PostgreSQL listo"
echo "🚀 Todos los servicios deberían estar levantados:"
echo "🔹 Backend: http://localhost:5002"
echo "🔹 Frontend Web: http://localhost:3000"
echo "🔹 Frontend Móvil (Expo): http://localhost:19006"
