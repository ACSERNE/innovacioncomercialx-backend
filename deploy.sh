#!/usr/bin/env bash
set -e

echo "🚀 ComercialX Cockpit - Despliegue automático"

if command -v gh-pages >/dev/null 2>&1; then
  echo "🔗 Publicando en GitHub Pages..."
  npx gh-pages -d exports
  echo "✅ Publicado en https://<usuario>.github.io/<repositorio>/dev/dev.html"
elif command -v netlify >/dev/null 2>&1; then
  echo "🌐 Publicando en Netlify..."
  netlify deploy --dir=exports --prod
elif command -v python3 >/dev/null 2>&1; then
  echo "🧪 Fallback local con Python HTTP server"
  python3 -m http.server --directory exports 8080
  echo "📂 Accede a http://localhost:8080/dev/dev.html"
else
  echo "❌ No se detectó entorno de despliegue. Instala gh-pages, netlify-cli o python3."
  exit 1
fi
