#!/bin/bash

# Tiempo máximo de espera por contenedor (en segundos)
MAX_WAIT=120
SLEEP_INTERVAL=2

# Función para esperar que un contenedor esté "running" con reintentos
wait_for_container() {
  local container_name=$1
  local elapsed=0
  echo "⏳ Esperando que $container_name esté listo..."
  
  while [ "$(docker inspect -f '{{.State.Status}}' $container_name 2>/dev/null)" != "running" ]; do
    sleep $SLEEP_INTERVAL
    elapsed=$((elapsed + SLEEP_INTERVAL))
    if [ $elapsed -ge $MAX_WAIT ]; then
      echo "⚠️ Tiempo de espera agotado para $container_name. Continuando..."
      return 1
    fi
  done
  echo "✅ $container_name está corriendo."
}

# Función para abrir URL en el navegador según el sistema operativo
open_url() {
  local url=$1
  case "$(uname -s)" in
    Linux*)   xdg-open "$url" ;;
    Darwin*)  open "$url" ;;
    CYGWIN*|MINGW*|MSYS*) start "$url" ;;
    *)        echo "No se pudo abrir el navegador automáticamente. Abre $url manualmente: $url" ;;
  esac
}

# Lista de contenedores frontales
FRONTENDS=("frontend-web-dev" "frontend-mobile-dev")

for container in "${FRONTENDS[@]}"; do
  wait_for_container $container
done

# Obtener los puertos asignados automáticamente por Docker
WEB_PORT=$(docker inspect -f '{{(index (index .NetworkSettings.Ports "3000/tcp") 0).HostPort}}' frontend-web-dev)
MOBILE_PORT=$(docker inspect -f '{{(index (index .NetworkSettings.Ports "3000/tcp") 0).HostPort}}' frontend-mobile-dev)

WEB_URL="http://localhost:$WEB_PORT"
MOBILE_URL="http://localhost:$MOBILE_PORT"

echo "🌐 Frontend Web en $WEB_URL"
echo "📱 Frontend Mobile en $MOBILE_URL"

# Abrir ambos en el navegador
open_url "$WEB_URL"
open_url "$MOBILE_URL"
