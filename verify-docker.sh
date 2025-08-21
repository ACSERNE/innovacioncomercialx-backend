#!/bin/bash

echo "╭────────────────────────────────────────────╮"
echo "│ 🐳 ComercialX - Verificación Docker        │"
echo "╰────────────────────────────────────────────╯"

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
IMAGE="comercialx-backend"
STATUS_LOG=""

# Detectar contenedor activo
CID=$(docker ps --filter "ancestor=$IMAGE" --format "{{.ID}}")

if [ -z "$CID" ]; then
  echo "❌ No hay contenedores activos de $IMAGE"
  STATUS_LOG+="| Contenedor | ❌ Inactivo |\n"
else
  echo "✅ Contenedor activo: $CID"
  STATUS_LOG+="| Contenedor | ✅ Activo |\n"

  # Verificar salud
  HEALTH=$(docker inspect --format='{{json .State.Health}}' "$CID" 2>/dev/null)
  if [ -n "$HEALTH" ]; then
    echo "🩺 Salud del contenedor:"
    echo "$HEALTH" | jq
    STATUS_LOG+="| Salud       | ✅ HEALTHCHECK Detectado |\n"
  else
    echo "⚠️ No se detectó HEALTHCHECK"
    STATUS_LOG+="| Salud       | ⚠️ No definido |\n"
  fi

  # Logs recientes
  echo "📄 Últimos logs:"
  docker logs "$CID" --tail 10
  STATUS_LOG+="| Logs        | ✅ Exportados |\n"
fi

# Exportar log visual
echo -e "# 🐳 Verificación Docker ComercialX\n\n| Componente   | Estado                  |\n|--------------|--------------------------|\n$STATUS_LOG\n🕒 Timestamp: $TIMESTAMP\n✍️ *ComercialX Cockpit CLI*" > docker-status.md
echo "📄 Log exportado como docker-status.md"
