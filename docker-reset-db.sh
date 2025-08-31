#!/bin/bash
set -e

# =============================
# Variables de entorno
# =============================
DB_NAME=${DB_NAME:-innovacioncomercialx}
DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}

echo "🛑 Deteniendo y eliminando contenedores antiguos..."
docker-compose down -v

echo "📦 Levantando PostgreSQL..."
docker-compose up -d postgres

echo "⏳ Esperando a que PostgreSQL esté disponible..."
spinner="/|\\-/|\\-"
i=0
until docker-compose exec -T postgres pg_isready -U $DB_USER > /dev/null 2>&1; do
  i=$(( (i+1) %8 ))
  printf "\rEsperando a PostgreSQL... ${spinner:$i:1}"
  sleep 0.2
done
printf "\r✅ PostgreSQL está listo.           \n"

echo "📌 Creando base de datos limpia..."
docker-compose exec -T postgres psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker-compose exec -T postgres psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
echo "✅ Base de datos creada: $DB_NAME"

echo "🚀 Levantando todos los servicios..."
docker-compose up -d

# Espera opcional para que el backend se inicialice
echo "⏳ Esperando a que el backend esté listo..."
sleep 10

echo "🔨 Aplicando migraciones..."
docker-compose exec -T backend npx sequelize-cli db:migrate || {
  echo "❌ Error aplicando migraciones."
  exit 1
}

echo "🔨 Aplicando seeds..."
docker-compose exec -T backend npx sequelize-cli db:seed:all || {
  echo "❌ Error aplicando seeds."
  exit 1
}

# Verificación de tablas creadas
echo "🔍 Verificando migraciones aplicadas..."
tables=$(docker-compose exec -T postgres psql -U $DB_USER -d $DB_NAME -t -c "\dt" | awk '{print $3}')
if [[ -z "$tables" ]]; then
  echo "❌ No se detectaron tablas en la base de datos."
  exit 1
else
  echo "✅ Tablas en la base de datos: $tables"
fi

echo "✅ Migraciones y seeds aplicadas correctamente."
echo "📢 Mostrando logs del backend en tiempo real (Ctrl+C para salir)..."
docker-compose logs -f backend

