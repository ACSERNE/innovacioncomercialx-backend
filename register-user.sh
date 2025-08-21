#!/bin/bash

# 📍 Ruta del script actual
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_FILE="$SCRIPT_DIR/../data/usuarios.csv"

# 📥 Parseo de argumentos
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --name) name="$2"; shift ;;
    --email) email="$2"; shift ;;
    --role) role="$2"; shift ;;
    *) echo "❌ Opción desconocida: $1"; exit 1 ;;
  esac
  shift
done

# 🧾 Si faltan argumentos, lanzar menú interactivo
if [[ -z "$name" || -z "$email" || -z "$role" ]]; then
  echo "=== Registro de Usuario (interactivo) ==="
  read -p "Nombre completo: " name
  read -p "Correo electrónico: " email
  read -p "Rol (admin/vendor/buyer/auditor/soporte): " role
fi

# ✅ Validación de email
if [[ ! "$email" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
  echo "❌ Email inválido. Intenta de nuevo."
  exit 1
fi

# 🔍 Verificar duplicado por email
mkdir -p "$SCRIPT_DIR/../data"
touch "$DATA_FILE"
if grep -q ",$email," "$DATA_FILE"; then
  echo "⚠️ El usuario con email $email ya está registrado."
  exit 1
fi

# 🗂️ Registro en CSV
echo "$name,$email,$role,$(date)" >> "$DATA_FILE"

# 🚀 Flujo de onboarding
bash "$SCRIPT_DIR/setup-folders.sh" "$name" "$role"
bash "$SCRIPT_DIR/install-deps.sh" "$role"
bash "$SCRIPT_DIR/generate-report.sh" "$name" "$role"
bash "$SCRIPT_DIR/archive-log.sh" "$name" "$role"

echo "✅ Usuario registrado y archivado correctamente."