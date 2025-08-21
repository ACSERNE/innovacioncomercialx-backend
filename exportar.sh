#!/bin/bash
mkdir -p exports

for opcion in \
  "🔄 Iniciar sesión" \
  "🧑‍💼 Crear nuevo usuario" \
  "🆕 Crear nuevo producto" \
  "🛒 Publicar producto existente" \
  "✏️ Editar producto existente" \
  "❌ Eliminar producto" \
  "📦 Ver inventario" \
  "💰 Flujo de caja" \
  "📦 Ver stock por producto" \
  "📈 Ver estadísticas generales" \
  "🔍 Buscar producto por nombre" \
  "📊 Ver reportes filtrados" \
  "📝 Exportar auditoría en Markdown" \
  "🧾 Filtrar historial de auditoría" \
  "🔐 Ver firma local de sesión" \
  "🧪 Activar modo sandbox" \
  "🤖 Copilot CLI integrado" \
  "📈 Ejecutar plugin Analytics" \
  "🚪 Cerrar sesión" \
  "🚪 Salir del sistema"
do
  nombre=$(echo "$opcion" | tr -cd '[:alnum:]' | tr '[:upper:]' '[:lower:]')
  ruta="docs/opciones/${nombre}"

  # README cockpitizado
  cat > "${ruta}-README.md" <<EOM
# ComercialX Cockpit — $opcion

Este paquete contiene los artefactos técnicos para la acción **$opcion**:

- Micrositio HTML
- Documentación Markdown
- Exportación JSON/YAML
- Badge SVG
- ZIP técnico

Publicado desde CLI cockpitizado.
EOM

  # ZIP con fallback
  if command -v zip >/dev/null 2>&1; then
    zip -j "exports/${nombre}.zip" \
      "${ruta}.html" \
      "${ruta}.md" \
      "${ruta}.json" \
      "${ruta}.yaml" \
      "${ruta}.svg" \
      "${ruta}-README.md"
    echo "✅ ZIP generado con zip: exports/${nombre}.zip"
  else
    echo "⚠️ zip no disponible, usando PowerShell como fallback..."
    powershell.exe -Command "Compress-Archive -Path '${ruta}.html','${ruta}.md','${ruta}.json','${ruta}.yaml','${ruta}.svg','${ruta}-README.md' -DestinationPath 'exports/${nombre}.zip'"
    echo "✅ ZIP generado con PowerShell: exports/${nombre}.zip"
  fi
done
