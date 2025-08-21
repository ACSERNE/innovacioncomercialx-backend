#!/bin/bash
set -e

echo "🛡️ Verificando y restaurando maestro si está incompleto..."
node scripts/dashboard-reset.js

echo "🔧 Ejecutando render cockpitizado..."
node scripts/dashboard-render.js

echo "🔍 Sincronizando maestro con template..."
node scripts/maestro-sync.js

echo "📦 Verificando artefactos federados por país..."
node scripts/publish-check.js

echo "✅ Flujo de publicación cockpitizado completado"
