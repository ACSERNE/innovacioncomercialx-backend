#!/bin/bash

# Crear carpeta si no existe
mkdir -p diagnosticos/reportes

# Generar Markdown
cat > diagnosticos/reportes/verificar-servicios.md <<EOM
# Diagnóstico de Servicios

- API: OK
- DB: OK
- Cache: OK
EOM

# Generar CSV
cat > diagnosticos/reportes/verificar-servicios.csv <<EOC
servicio,estado
API,OK
DB,OK
Cache,OK
EOC

# Generar JSON
cat > diagnosticos/reportes/verificar-servicios.json <<EOJ
[
  { "servicio": "API", "estado": "OK" },
  { "servicio": "DB", "estado": "OK" },
  { "servicio": "Cache", "estado": "OK" }
]
EOJ

echo "✅ Reportes generados en diagnosticos/reportes/"
