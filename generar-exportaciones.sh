
# 🕒 Timestamp actual
timestamp=$(date -Iseconds)

# 🔁 Módulos técnicos
modulos=("docs" "entorno" "backend" "docker")

for modulo in "${modulos[@]}"; do
  # 📦 Estado simulado por módulo
  case $modulo in
    docs)     estado="OK";        color="brightgreen"; ;;
    entorno)  estado="dev";       color="blue"; ;;
    backend)  estado="pendiente"; color="yellow"; ;;
    docker)   estado="pendiente"; color="yellow"; ;;
  esac

  # 🖼️ Badge SVG
  cat << EOF > audit/${modulo}.svg
https://img.shields.io/badge/${modulo}-${estado}-${color}.svg
EOF

  # 📚 Markdown cockpitizado
  cat << EOF > audit/${modulo}.md
## 🧭 ComercialX Cockpit - ${modulo^}

![Badge](https://img.shields.io/badge/${modulo}-${estado}-${color}.svg)

- Estado: ${estado}
- Timestamp: ${timestamp}
- Exportación generada automáticamente desde scripts cockpitizados.
EOF

  # 🧾 JSON estructurado
  cat << EOF > audit/${modulo}.json
{
  "modulo": "${modulo}",
  "estado": "${estado}",
  "timestamp": "${timestamp}",
  "badge": "https://img.shields.io/badge/${modulo}-${estado}-${color}.svg"
}
EOF
done
