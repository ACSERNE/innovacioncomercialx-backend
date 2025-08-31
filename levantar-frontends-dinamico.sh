#!/bin/bash

# Función para encontrar un puerto libre
find_free_port() {
  local port=$1
  while lsof -iTCP:$port -sTCP:LISTEN >/dev/null 2>&1; do
    port=$((port + 1))
  done
  echo $port
}

# Asignar puertos libres
export FRONTEND_WEB_PORT=$(find_free_port 3000)
export FRONTEND_MOBILE_PORT=$(find_free_port 19000)

echo "🌐 Puerto frontend-web-dev: $FRONTEND_WEB_PORT"
echo "🌐 Puerto frontend-mobile-dev: $FRONTEND_MOBILE_PORT"

# Levantar contenedores
docker compose up -d --build

# Esperar a que los contenedores estén corriendo
sleep 5

# Abrir URLs en navegador
xdg-open "http://localhost:$FRONTEND_WEB_PORT" 2>/dev/null || open "http://localhost:$FRONTEND_WEB_PORT" 2>/dev/null || start "http://localhost:$FRONTEND_WEB_PORT"
xdg-open "http://localhost:$FRONTEND_MOBILE_PORT" 2>/dev/null || open "http://localhost:$FRONTEND_MOBILE_PORT" 2>/dev/null || start "http://localhost:$FRONTEND_MOBILE_PORT"

