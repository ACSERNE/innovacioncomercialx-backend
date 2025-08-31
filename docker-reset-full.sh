#!/bin/bash

echo "🛑 Deteniendo y eliminando contenedores antiguos..."
docker compose down --remove-orphans

# Liberar puertos 3000, 5002, 19006 en Windows (PowerShell)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "🔓 Liberando puertos 3000, 5002 y 19006 en Windows..."
    for PORT in 3000 5002 19006; do
        PID=$(netstat -ano | findstr :$PORT | awk '{print $5}' | tr -d '\r')
        if [ ! -z "$PID" ]; then
            echo "🔹 Cerrando proceso en puerto $PORT (PID $PID)..."
            powershell.exe taskkill /PID $PID /F
        fi
    done
fi

echo "📦 Levantando todos los servicios Docker..."
docker compose up -d --build

echo "✅ Todos los servicios levantados correctamente."
