#!/bin/bash
set -e  # Detiene si hay un error

echo "🛑 Deteniendo contenedores..."
docker-compose down

echo "🔁 Reconstruyendo y levantando contenedores..."
docker-compose up --build -d

echo "⏳ Esperando que backend esté listo para comandos sequelize..."
until docker exec backend-innovacion npx sequelize-cli db:create > /dev/null 2>&1
do
  echo "🔄 Esperando conexión con backend..."
  sleep 2
done

echo "💥 Eliminando la base de datos..."
docker exec backend-innovacion npx sequelize-cli db:drop

echo "📦 Creando la base de datos..."
docker exec backend-innovacion npx sequelize-cli db:create

echo "📦 Ejecutando migraciones..."
docker exec backend-innovacion npx sequelize-cli db:migrate

echo "🌱 Insertando datos (seed)..."
docker exec backend-innovacion npx sequelize-cli db:seed:all

echo "✅ Backend reiniciado y base de datos reinicializada correctamente."
echo "📄 Mostrando logs del backend..."
docker logs -f backend-innovacion
