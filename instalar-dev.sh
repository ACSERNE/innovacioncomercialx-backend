#!/bin/bash
set -ex

echo "🔧 Entorno de desarrollo - Inicializando..."

if [ ! -d "backend" ]; then
  echo "❌ Error: No se encuentra la carpeta backend"
  exit 1
fi

cd backend

echo "📦 Instalando dependencias..."
npm install

echo "🐳 Levantando contenedores Docker..."
docker-compose up -d

echo "⏳ Esperando a que Postgres esté listo..."
for i in {1..30}; do
  if docker exec postgres-innovacion pg_isready -U postgres &>/dev/null; then
    echo "✅ Postgres está listo"
    break
  fi
  sleep 2
done

echo "🧨 Revirtiendo todas las migraciones..."
npx sequelize-cli db:migrate:undo:all

echo "🧱 Aplicando migraciones..."
npx sequelize-cli db:migrate

echo "🌱 Ejecutando seeds..."
npx sequelize-cli db:seed:all

echo "✅ Instalación en desarrollo finalizada correctamente."
