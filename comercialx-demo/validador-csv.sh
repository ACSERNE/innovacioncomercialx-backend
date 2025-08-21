#!/bin/bash
curl -s https://ACSERNE.github.io/comercialx-demo/dashboard.csv | while IFS=',' read -r pais entorno estado version url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [[ "$code" == "200" ]]; then
    echo "✅ [$pais-$entorno] $url responde OK"
  else
    echo "❌ [$pais-$entorno] $url falla (HTTP $code)"
  fi
done
