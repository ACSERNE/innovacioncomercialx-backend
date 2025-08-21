#!/bin/bash
set -ex

echo "🔍 Detectando carpeta backend..."
SCRIPT_DIR=$(dirname "$(realpath "$0")")

if [ -d "$SCRIPT_DIR/backend" ]; then
  BACKEND_DIR="$SCRIPT_DIR/backend"
elif [ -d "$SCRIPT_DIR/../backend" ]; then
  BACKEND_DIR="$SCRIPT_DIR/../backend"
else
  echo "❌ Error: No se encuentra la carpeta backend"
  exit 1
fi

echo "✅ Carpeta backend encontrada en: $BACKEND_DIR"
echo "Paso 1: Entrando a backend"
cd "$BACKEND_DIR"

echo "Paso 2: Instalando dependencias npm"
npm install

echo "Paso 3: Volviendo al directorio raíz del proyecto"
cd "$SCRIPT_DIR"

echo "Paso 4: Levantando Docker Compose"
docker-compose up -d

echo "Paso 5: Ejecutando migraciones dentro del contenedor backend"
docker exec backend-innovacion npx sequelize-cli db:migrate

echo "Paso 6: Ejecutando seeds dentro del contenedor backend"
docker exec backend-innovacion npx sequelize-cli db:seed:all

echo "🚀 Proceso finalizado con éxito."
