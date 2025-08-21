#!/bin/bash
log="exports/onboarding/onboarding.log"
mkdir -p exports/onboarding

timestamp=$(date +"%Y-%m-%d %H:%M:%S")
tipo="$1"
entorno="$2"

echo "[$timestamp] 🧭 Onboarding solicitado" >> "$log"
echo "Tipo de tienda: $tipo" >> "$log"
echo "Entorno: $entorno" >> "$log"
echo "Acción: Activación cockpitizada" >> "$log"
echo "---" >> "$log"

echo "✅ Log registrado en: $log"
