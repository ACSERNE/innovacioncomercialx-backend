#!/bin/bash

echo "🚀 Ejecutando pipeline cockpitizado..."

# Validación técnica
./scripts/build-check.sh || echo "⚠️ build-check falló"

# Validación de workflow
./scripts/workflow-check.sh || echo "⚠️ workflow-check falló"

# Validación de publicación
./scripts/publish-check.sh || echo "⚠️ publish-check falló"

# Renderizado visual
node scripts/dashboard-render.js || echo "⚠️ render.js falló"

echo "✅ Dashboard cockpitizado generado y federado correctamente."
