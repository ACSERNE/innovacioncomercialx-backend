#!/bin/bash

# 🔹 Variables de entorno (ajusta según tu .env)
DB_HOST=${DB_HOST:-postgres-innovacion}
DB_PORT=${DB_PORT:-5432}

# 🔹 Detener y eliminar contenedores antiguos
echo "🛑 Deteniendo y eliminando contenedores antiguos..."
docker-compose down -v --remove-orphans

# 🔹 Construir imágenes y levantar servicios
echo "🔨 Construyendo imágenes y levantando servicios..."
docker-compose up --build -d

# 🔹 Esperar a que PostgreSQL esté disponible
echo "⏳ Esperando a que PostgreSQL esté listo en $DB_HOST:$DB_PORT..."
./wait-for-it.sh $DB_HOST:$DB_PORT --timeout=60 --strict -- echo "✅ PostgreSQL listo"

# 🔹 Iniciar backend
echo "🚀 Iniciando backend..."
docker exec -it backend-innovacion npm start

