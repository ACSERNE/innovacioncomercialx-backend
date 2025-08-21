#!/bin/bash
set -e

echo "🛑 Deteniendo y eliminando contenedores + volúmenes..."
docker compose down -v

echo "🧹 Limpiando imágenes huérfanas..."
docker image prune -f

echo "🔨 Reconstruyendo imágenes sin caché..."
docker compose build --no-cache

echo "🚀 Levantando contenedores..."
docker compose up -d

echo "📜 Mostrando logs del backend..."
docker logs -f backend-innovacion
