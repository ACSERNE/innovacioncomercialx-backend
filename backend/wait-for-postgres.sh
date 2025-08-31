#!/bin/sh
echo "🕐 Esperando que PostgreSQL esté disponible..."

until pg_isready -h "$1" -p 5432 -U "$DB_USER"; do
  sleep 1
done

echo "✅ PostgreSQL disponible. Ejecutando comandos..."
exec "${@:2}"
