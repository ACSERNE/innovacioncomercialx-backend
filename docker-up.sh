#!/bin/bash

echo "🛑 Deteniendo contenedores antiguos..."
docker-compose down -v

echo "📦 Levantando servicios..."
docker-compose up -d

echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 5

echo "🔨 Creando base de datos si no existe..."
docker-compose exec postgres psql -U $DB_USER -c "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

echo "⏳ Aplicando migraciones y seeds..."
docker-compose exec backend npx sequelize-cli db:migrate --config config/config.js
docker-compose exec backend npx sequelize-cli db:seed:all --config config/config.js

echo "✅ Todos los servicios deberían estar levantados correctamente:"
echo "🔹 Backend: http://localhost:5002"
echo "🔹 Frontend Web: http://localhost:3000"
echo "🔹 Frontend Móvil (Expo): http://localhost:19006"
echo "🔹 pgAdmin: http://localhost:8080"
