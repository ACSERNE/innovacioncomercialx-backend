#!/bin/bash

echo "🔍 Validando workflow cockpitizado..."

WORKFLOW=".github/workflows/deploy.yml"
LOG="workflow-log.json"
BADGE="dashboard/badges/workflow.svg"
STATUS="OK"

# Validar existencia del workflow
if [ ! -f "$WORKFLOW" ]; then
  echo "❌ No se encontró $WORKFLOW"
  STATUS="FAIL"
fi

# Validar pasos clave
REQUIRED_STEPS=("actions/checkout@v4" "actions/setup-node@v4" "npm ci" "npm run build" "upload-artifact@v4" "gh-pages")
for step in "${REQUIRED_STEPS[@]}"; do
  grep -q "$step" "$WORKFLOW" || {
    echo "❌ Falta paso: $step"
    STATUS="FAIL"
  }
done

# Generar log técnico
mkdir -p dashboard
cat <<EOL > "$LOG"
{
  "workflow": "$WORKFLOW",
  "status": "$STATUS",
  "checked_steps": ${#REQUIRED_STEPS[@]},
  "timestamp": "$(date -Iseconds)"
}
EOL

# Generar badge SVG dinámico
case "$STATUS" in
  OK)
    LABEL="Workflow_OK"
    COLOR="brightgreen"
    ;;
  FAIL)
    LABEL="Workflow_FAIL"
    COLOR="red"
    ;;
  *)
    LABEL="Workflow_Warning"
    COLOR="yellow"
    ;;
esac

curl -s -o "$BADGE" "https://img.shields.io/badge/Workflow-$LABEL-$COLOR.svg"

echo "✅ Validación completada. Estado: $STATUS"
