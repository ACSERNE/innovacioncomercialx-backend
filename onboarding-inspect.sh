#!/bin/bash

timestamp=$(date +"%Y-%m-%d %H:%M:%S")
logfile="exports/onboarding/inspeccion.log"

echo "🔍 Inspección de artefactos de onboarding ($timestamp)"
echo "--------------------------------------------------------" | tee -a "$logfile"

for file in micrositios/onboarding/release.html \
            exports/onboarding/onboarding.log \
            exports/onboarding/README.md \
            exports/badges/dev.svg; do

  echo -e "\n📄 Archivo: $file" | tee -a "$logfile"
  if [[ -f "$file" ]]; then
    case "$file" in
      *.html)
        echo "🌐 Tipo: HTML (visualizable en navegador)" | tee -a "$logfile"
        echo "🧾 Contenido (primeras 10 líneas):" | tee -a "$logfile"
        head -n 10 "$file" | tee -a "$logfile"
        ;;
      *.log)
        echo "📝 Tipo: Log técnico" | tee -a "$logfile"
        echo "🧾 Contenido:" | tee -a "$logfile"
        cat "$file" | tee -a "$logfile"
        ;;
      *.md)
        echo "📘 Tipo: Markdown (README)" | tee -a "$logfile"
        echo "🧾 Contenido:" | tee -a "$logfile"
        cat "$file" | tee -a "$logfile"
        ;;
      *.svg)
        echo "🎨 Tipo: Badge SVG" | tee -a "$logfile"
        echo "🧾 Contenido (primeras 5 líneas):" | tee -a "$logfile"
        head -n 5 "$file" | tee -a "$logfile"
        ;;
      *)
        echo "❓ Tipo desconocido" | tee -a "$logfile"
        ;;
    esac
  else
    echo "⚠️ Archivo no encontrado" | tee -a "$logfile"
  fi
done

echo -e "\n📦 Archivo ZIP: exports/onboarding/onboarding.zip" | tee -a "$logfile"
if [[ -f exports/onboarding/onboarding.zip ]]; then
  echo "🗂️ Contenido del ZIP:" | tee -a "$logfile"
  unzip -l exports/onboarding/onboarding.zip | tee -a "$logfile"
else
  echo "⚠️ ZIP no encontrado" | tee -a "$logfile"
fi

echo -e "\n✅ Log de inspección registrado en: $logfile"
