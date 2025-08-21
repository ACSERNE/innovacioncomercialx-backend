#!/bin/bash
echo "🚀 Regenerando cockpit técnico..."

# Regenerar ZIP
tar -czf routes-site/comercialx-cockpit.tar.gz -C routes-site .

# Validar JSON
node validate-json.cjs

# Confirmar micrositios
ls routes-site/*.html

echo "✅ Cockpit regenerado con éxito"
