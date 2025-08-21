#!/bin/bash
# Espera a que Postgres esté disponible antes de levantar el backend

./wait-for-it.sh postgres-innovacion:5432 --timeout=30 --strict -- echo "✅ Postgres está disponible, arrancando backend..."

# Arranca el backend
node server.cjs
