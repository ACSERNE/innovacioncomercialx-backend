#!/bin/bash

URL=${1:-"http://localhost:3000"}
TOKEN=${2:-""}
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "🌐 Verificando endpoint: $URL"

if [ -n "$TOKEN" ]; then
  RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$URL")
else
  RESPONSE=$(curl -s "$URL")
fi

STATUS=$(echo "$RESPONSE" | grep -i "ok\|ready\|running")

if [ -n "$STATUS" ]; then
  echo "✅ Backend responde correctamente"
  echo -e "# ✅ Verificación Remota\n\n- URL: $URL\n- Estado: OK\n- Timestamp: $TIMESTAMP\n" > verify-status.md
else
  echo "❌ No se detectó respuesta válida"
  echo -e "# ❌ Verificación Fallida\n\n- URL: $URL\n- Estado: ERROR\n- Timestamp: $TIMESTAMP\n" > verify-status.md
fi

echo "📄 Log exportado como verify-status.md"
