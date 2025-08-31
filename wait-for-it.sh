#!/usr/bin/env bash
# https://github.com/vishnubob/wait-for-it
# Uso: ./wait-for-it.sh host:port [--timeout=SECONDS] [--strict] [-- COMMAND args]

TIMEOUT=60
STRICT=0

for arg in "$@"; do
  case "$arg" in
    --timeout=*) TIMEOUT="${arg#*=}" ;;
    --strict) STRICT=1 ;;
  esac
done

HOST=$(echo $1 | cut -d: -f1)
PORT=$(echo $1 | cut -d: -f2)

echo "⏳ Esperando a que $HOST:$PORT esté disponible..."
for i in $(seq $TIMEOUT); do
  nc -z "$HOST" "$PORT" >/dev/null 2>&1 && break
  sleep 1
done

if ! nc -z "$HOST" "$PORT" >/dev/null 2>&1; then
  echo "❌ Timeout alcanzado esperando $HOST:$PORT"
  [ $STRICT -eq 1 ] && exit 1
fi

echo "✅ $HOST:$PORT listo"
shift
exec "$@"
