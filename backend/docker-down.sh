#!/bin/bash
set -e

echo "🛑 Deteniendo contenedores..."
docker-compose down

echo "🗑 Eliminando volúmenes del proyecto..."
docker volume prune -f

echo "🧹 Limpiando redes huérfanas..."
docker network prune -f

echo "✅ Todos los contenedores, volúmenes y redes eliminados"
