#!/bin/bash
set -ex

echo "🚀 Entorno de producción - Inicializando..."

if [ ! -d "backend" ]; then
  echo "❌ Error: No se encuentra la carpeta backend"
  exit 1
fi

cd backend

echo "📦 Instalando dependencias (modo producción)..."
npm ci --omit=dev

echo "🐳 Levantando Docker Compose (producción)..."
docker-compose -f docker-compose.prod.yml up -d

echo "⏳ Esperando a que Postgres esté listo..."
for i in {1..30}; do
  if docker exec postgres-innovacion pg_isready -U postgres &>/dev/null; then
    echo "✅ Postgres está listo"
    break
  fi
  sleep 2
done

echo "🧱 Ejecutando migraciones (producción)..."
NODE_ENV=production npx sequelize-cli db:migrate

echo "🌱 Ejecutando seeds (producción)..."
NODE_ENV=production npx sequelize-cli db:seed:all

echo "✅ Instalación en producción completada con éxito."
