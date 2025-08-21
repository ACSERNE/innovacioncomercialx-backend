#!/bin/bash

echo "🔍 Validando módulos cockpitizados..."

MODULOS=(backend docker entorno docs)
for modulo in "${MODULOS[@]}"; do
  echo -e "\n📦 Módulo: $modulo"

  JSON="routes-site/${modulo}-extendido.json"
  MD="routes-site/${modulo}-extendido.md"
  HTML="routes-site/${modulo}.html"
  BADGE="routes-site/badge-${modulo}.svg"

  # Validar existencia
  [[ -f "$JSON" ]] && echo "✅ JSON encontrado" || echo "❌ Falta JSON"
  [[ -f "$MD" ]] && echo "✅ Markdown encontrado" || echo "❌ Falta Markdown"
  [[ -f "$HTML" ]] && echo "✅ Micrositio HTML encontrado" || echo "❌ Falta HTML"
  [[ -f "$BADGE" ]] && echo "✅ Badge SVG encontrado" || echo "❌ Falta badge"

  # Validar sintaxis JSON
  jq empty "$JSON" 2>/dev/null && echo "🧪 JSON válido" || echo "⚠️ JSON inválido"
done

echo -e "\n📤 Generando ZIP cockpitizado..."
zip -r comercialx-cockpit.zip routes-site/ > /dev/null && echo "✅ ZIP generado: comercialx-cockpit.zip"
