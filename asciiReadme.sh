#!/bin/bash

VERSION="v1.0"
AUTHOR="Valdez"
DATE=$(date +"%d-%m-%Y")

ASCII_BLOCK=$(cat << EOT
╔════════════════════════════════════════════╗
║ 🚀 ComercialX Cockpit CLI                 ║
║ Versión: $VERSION                         ║
║ Autor: $AUTHOR                            ║
║ Fecha: $DATE                              ║
╚════════════════════════════════════════════╝
EOT
)

# Insertar al inicio del README.md
README="README.md"
TEMP="README.tmp"

echo "$ASCII_BLOCK" > "$TEMP"
echo "" >> "$TEMP"
cat "$README" >> "$TEMP"
mv "$TEMP" "$README"

echo "✅ Branding ASCII actualizado en $README"
