#!/bin/bash

echo "╭───────────────────────────────────────────────╮"
echo "│ 🔍 ComercialX Cockpit: Validación ESM Smart   │"
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

# 3. Buscar 'await' fuera de funciones (heurística simple)
echo "🔎 Buscando 'await' fuera de funciones (modo heurístico)..."

find . -name "*.js" | while read -r file; do
  awk '
    BEGIN { inside_async = 0 }
    /async function|exports.*= *async|const .* = *async/ { inside_async = 1 }
    /}/ { inside_async = 0 }
    /await / {
      if (!inside_async) {
        print "⚠️  Posible await fuera de función en " FILENAME ":"
        print "    " $0
      }
    }
  ' "$file"
done

echo "✅ Escaneo completado. Si no ves advertencias arriba, estás en modo CommonJS puro."
