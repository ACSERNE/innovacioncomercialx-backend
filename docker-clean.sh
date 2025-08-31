#!/bin/bash
set -e

echo "🧹 Deteniendo todos los contenedores en ejecución..."
docker ps -q | xargs -r docker stop

echo "🗑️ Eliminando todos los contenedores detenidos..."
docker ps -aq | xargs -r docker rm

echo "🧩 Eliminando volúmenes no utilizados..."
docker volume prune -f

echo "🌐 Eliminando redes no utilizadas..."
docker network prune -f

echo "✅ Limpieza completa de Docker realizada."
