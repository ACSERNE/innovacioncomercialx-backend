#!/bin/bash
# levantar-docker.sh

# Función para buscar un puerto libre a partir de uno inicial
find_free_port() {
  local port=$1
  while lsof -iTCP:$port -sTCP:LISTEN >/dev/null 2>&1; do
    port=$((port + 1))
  done
  echo $port
}

# Buscar puertos libres para frontend web y mobile
export FRONTEND_WEB_PORT=$(find_free_port 3000)
export FRONTEND_MOBILE_PORT=$(find_free_port 19000)

# Levantar todos los contenedores con Docker Compose
docker compose up -d --build
