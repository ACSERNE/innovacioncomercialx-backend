#!/bin/bash

echo "╭───────────────────────────────────────────────╮"
echo "│ 🛠️ ComercialX Cockpit: Fix Await Automático   │"
echo "╰───────────────────────────────────────────────╯"

find . -name "*.js" | while read -r file; do
  if grep -q "await " "$file"; then
    # Verificar si ya tiene una función async
    if ! grep -q "async function" "$file"; then
      echo "🔧 Encapsulando await en $file..."

      cp "$file" "$file.bak"

      echo "async function main() {" > temp.$$.js
      cat "$file" >> temp.$$.js
      echo "}" >> temp.$$.js
      echo "main()" >> temp.$$.js

      mv temp.$$.js "$file"
    fi
  fi
done

echo "✅ Refactorización completada. Archivos originales respaldados como *.bak"
