#!/bin/bash

# Tiempo máximo de espera por contenedor estable (segundos)
MAX_WAIT=180
SLEEP_INTERVAL=3
FRONTENDS=("frontend-web-dev" "frontend-mobile-dev")

# Función: esperar que un contenedor esté estable
wait_for_stable_container() {
  local container=$1
  local elapsed=0
  local stable_count=0
  local required_stable=3

  echo "⏳ Esperando que $container esté estable..."
  while [ $elapsed -lt $MAX_WAIT ]; do
    STATUS=$(docker inspect -f '{{.State.Status}}' $container 2>/dev/null)
    if [ "$STATUS" == "running" ]; then
      stable_count=$((stable_count + 1))
      if [ $stable_count -ge $required_stable ]; then
        echo "✅ $container estable y corriendo."
        return 0
      fi
    else
      stable_count=0
    fi
    sleep $SLEEP_INTERVAL
    elapsed=$((elapsed + SLEEP_INTERVAL))
  done
  echo "⚠️ $container no se estabilizó en $MAX_WAIT segundos."
  return 1
}

# Función: abrir URL en navegador
open_url() {
  local url=$1
  case "$(uname -s)" in
    Linux*) xdg-open "$url" ;;
    Darwin*) open "$url" ;;
    CYGWIN*|MINGW*|MSYS*) start "$url" ;;
    *) echo "Abre manualmente: $url" ;;
  esac
}

# Reiniciar contenedores caídos o con puertos ocupados
for container in "${FRONTENDS[@]}"; do
  EXIST=$(docker ps -a -q -f name=$container)
  if [ -n "$EXIST" ]; then
    echo "🔄 Reiniciando $container..."
    docker rm -f $container >/dev/null 2>&1
  fi
done

# Levantar contenedores
echo "🚀 Levantando frontends..."
docker compose up -d --build

# Esperar a que cada contenedor esté estable
for container in "${FRONTENDS[@]}"; do
  wait_for_stable_container $container
done

# Abrir URLs de contenedores en navegador
for container in "${FRONTENDS[@]}"; do
  PORTS=$(docker inspect -f '{{range $p, $conf := .NetworkSettings.Ports}}{{if $conf}}{{(index $conf 0).HostPort}} {{end}}{{end}}' $container)
  for port in $PORTS; do
    URL="http://localhost:$port"
    echo "🌐 $container disponible en $URL"
    open_url "$URL"
  done
done

