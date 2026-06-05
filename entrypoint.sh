#!/bin/sh

echo "Esperando a que la base de datos esté lista..."

# Esperar a que el contenedor de la base de datos responda en el puerto 5432
while ! nc -z db 5432; do
  sleep 1
done

echo "Base de datos disponible. Ejecutando migraciones..."
npx sequelize-cli db:migrate

echo "Iniciando servidor..."
npm run dev
