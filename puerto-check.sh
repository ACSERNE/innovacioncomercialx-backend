#!/bin/bash

PORT=3000
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "╭────────────────────────────────────────────╮"
echo "│ 🔍 ComercialX - Verificación de Puerto     │"
echo "╰────────────────────────────────────────────╯"

echo "🕒 Timestamp: $TIMESTAMP"
echo "🔎 Escaneando puerto $PORT..."

PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
  echo "✅ Puerto $PORT está libre."
  exit 0
fi

echo "⚠️  Puerto $PORT está ocupado por el proceso:"
lsof -i:$PORT | grep LISTEN

echo "🧠 PID detectado: $PID"
echo "¿Deseas terminar el proceso? (s/n)"
read OPCION

if [ "$OPCION" == "s" ]; then
  kill -9 $PID
  echo "🧹 Proceso $PID terminado. Puerto liberado."
else
  echo "🚫 Proceso no terminado. Puerto sigue ocupado."
fi

# 📝 Exportar log técnico
echo "# 🧾 Log de Puerto Ocupado\n\n- Puerto: $PORT\n- Timestamp: $TIMESTAMP\n- PID: $PID\n- Acción: $OPCION\n" > puerto-ocupado.md
echo "📄 Log exportado como puerto-ocupado.md"
