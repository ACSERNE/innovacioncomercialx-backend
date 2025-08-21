#!/bin/bash

echo "🚀 Validando publicación multiplataforma..."

STATUS="OK"
CSV="publish-status.csv"
LOG="publish-log.json"
BADGE="dashboard/badges/publish.svg"
ENTORNOS=("github-pages" "netlify" "railway")

# Validar publicación por entorno
echo "entorno,estado" > "$CSV"
for entorno in "${ENTORNOS[@]}"; do
  case "$entorno" in
    github-pages)
      curl -s --head https://acserne.github.io/comercialx-demo/ | grep "200 OK" >/dev/null || STATUS="FAIL"
      ;;
    netlify)
      curl -s --head https://comercialx-demo.netlify.app/ | grep "200 OK" >/dev/null || STATUS="FAIL"
      ;;
    railway)
      curl -s --head https://comercialx-demo.up.railway.app/ | grep "200 OK" >/dev/null || STATUS="FAIL"
      ;;
  esac
  echo "$entorno,$STATUS" >> "$CSV"
done

# Generar log técnico
cat <<EOL > "$LOG"
{
  "status": "$STATUS",
  "checked_entornos": ${#ENTORNOS[@]},
  "timestamp": "$(date -Iseconds)"
}
EOL

# Generar badge SVG dinámico
case "$STATUS" in
  OK)
    LABEL="Published_OK"
    COLOR="brightgreen"
    ;;
  FAIL)
    LABEL="Publish_FAIL"
    COLOR="red"
    ;;
  *)
    LABEL="Publish_Warning"
    COLOR="yellow"
    ;;
esac

curl -s -o "$BADGE" "https://img.shields.io/badge/Publish-$LABEL-$COLOR.svg"

echo "✅ Publicación validada. Estado: $STATUS"
