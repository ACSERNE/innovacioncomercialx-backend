#!/bin/bash

# Tiempo máximo de espera por contenedor (en segundos)
MAX_WAIT=180
SLEEP_INTERVAL=3

# Función para esperar que un contenedor esté "running" y estable
wait_for_stable_container() {
  local container_name=$1
  local elapsed=0
  local stable_count=0
  local required_stable=3   # Debe estar "running" 3 veces consecutivas
  
  echo "⏳ Esperando que $container_name esté estable..."
  
  while [ $elapsed -lt $MAX_WAIT ]; do
    STATUS=$(docker inspect -f '{{.State.Status}}' $container_name 2>/dev/null)
    
    if [ "$STATUS" == "running" ]; then
      stable_count=$((stable_count + 1))
      if [ $stable_count -ge $required_stable ]; then
        echo "✅ $container_name está estable y corriendo."
        return 0
      fi
    else
      stable_count=0
    fi
    
    sleep $SLEEP_INTERVAL
    elapsed=$((elapsed + SLEEP_INTERVAL))
  done
  
  echo "⚠️ $container_name no se estabilizó en $MAX_WAIT segundos."
  return 1
}

# Función para abrir URL en navegador
open_url() {
  local url=$1
  case "$(uname -s)" in
    Linux*)   xdg-open "$url" ;;
    Darwin*)  open "$url" ;;
    CYGWIN*|MINGW*|MSYS*) start "$url" ;;
    *)        echo "Abre manualmente: $url" ;;
  esac
}

# Contenedores frontales
FRONTENDS=("frontend-web-dev" "frontend-mobile-dev")

# Esperar que todos los contenedores estén estables
for container in "${FRONTENDS[@]}"; do
  wait_for_stable_container $container
done

# Obtener puertos y abrir URLs
for container in "${FRONTENDS[@]}"; do
  HOST_PORTS=$(docker inspect -f '{{range $p, $conf := .NetworkSettings.Ports}}{{if $conf}}{{(index $conf 0).HostPort}} {{end}}{{end}}' $container)
  for port in $HOST_PORTS; do
    URL="http://localhost:$port"
    echo "🌐 $container en $URL"
    open_url "$URL"
  done
done
