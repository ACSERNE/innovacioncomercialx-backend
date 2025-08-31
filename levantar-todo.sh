#!/bin/bash

echo "🛑 Deteniendo contenedores antiguos..."
docker-compose down

echo "🧹 Limpiando contenedores huérfanos, imágenes y volúmenes no usados..."
docker system prune -f
docker volume prune -f

echo "🏗 Construyendo y levantando contenedores..."
docker-compose up --build -d

echo "⏳ Esperando a que PostgreSQL esté listo..."
until docker exec -it postgres-innovacion pg_isready -U $DB_USER > /dev/null 2>&1; do
  sleep 2
done

echo "✅ Todos los servicios están levantados:"
docker ps
