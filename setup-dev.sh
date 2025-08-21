#!/bin/bash

echo "🚀 Iniciando entorno de desarrollo..."

# 1. Levantar contenedores
echo "🧱 Levantando contenedores con Docker..."
docker-compose up -d

# 2. Esperar a que Postgres esté listo (reintento suave)
echo "⏳ Esperando a que Postgres esté disponible..."
sleep 5

# 3. Migraciones y Seeders
echo "📋 Ejecutando migraciones y carga de datos..."
docker exec backend-innovacion sh -c "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"

# 4. Verificar productos cargados
echo "📦 Mostrando productos disponibles:"
npm run cli:listar

# 5. Abrir pgAdmin (si aplica)
if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
  echo "🌐 Abriendo pgAdmin..."
  xdg-open http://localhost:5050 &> /dev/null || open http://localhost:5050
fi

echo "✅ Entorno listo para desarrollo ✨"