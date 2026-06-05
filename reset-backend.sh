#!/bin/bash

echo "🛑 Deteniendo contenedores..."
docker-compose down

echo "🔁 Reconstruyendo y levantando contenedores..."
docker-compose up --build -d

echo "⏳ Esperando que los contenedores estén listos..."
sleep 5

echo "🛑 Cerrando conexiones activas a la base de datos..."
docker exec postgres-innovacion psql -U postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'innovacion_db' AND pid <> pg_backend_pid();"

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
