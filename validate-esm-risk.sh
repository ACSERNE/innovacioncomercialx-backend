#!/bin/bash

echo "╭───────────────────────────────────────────────╮"
echo "│ 🔍 ComercialX Cockpit: Validación ESM Risk    │"
echo "╰───────────────────────────────────────────────╯"

# 1. Verificar si package.json activa ESM
if grep -q '"type": *"module"' package.json 2>/dev/null; then
  echo "⚠️  package.json contiene \"type\": \"module\" → activa modo ESM"
else
  echo "✅ package.json no activa ESM explícitamente"
fi

# 2. Buscar archivos .mjs
MJS=$(find . -name "*.mjs")
if [ -n "$MJS" ]; then
  echo "⚠️  Archivos .mjs detectados:"
  echo "$MJS"
else
  echo "✅ No hay archivos .mjs"
fi

# 3. Buscar 'await' fuera de funciones
echo "🔎 Buscando 'await' fuera de funciones..."

grep -r --include="*.js" "await " . | while read -r line; do
  FILE=$(echo "$line" | cut -d: -f1)
  CODE=$(echo "$line" | cut -d: -f2-)

  # Detectar si está dentro de una función async
  if ! echo "$CODE" | grep -q "async "; then
    echo "⚠️  Posible 'await' fuera de función en $FILE:"
    echo "    $CODE"
  fi
done

echo "✅ Escaneo completado. Si no ves advertencias arriba, estás en modo CommonJS puro."
