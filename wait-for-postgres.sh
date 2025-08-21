#!/bin/sh

echo "⏳ Esperando a que Postgres esté listo..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "🔄 Aún esperando en $DB_HOST:$DB_PORT..."
  sleep 1
done

echo "✅ Postgres está listo. Iniciando el servidor..."

# Ejecutar el backend
exec node server.js
