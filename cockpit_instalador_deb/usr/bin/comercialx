#!/bin/bash
echo "🧠 ComercialX Cockpit CLI"
read -p "📧 Correo: " CORREO
USUARIO_LINEA=$(grep "$CORREO" datos/usuarios.csv)
if [ -z "$USUARIO_LINEA" ]; then echo "❌ Usuario no registrado."; exit 1; fi
NOMBRE=$(echo $USUARIO_LINEA | cut -d',' -f1)
ROL=$(echo $USUARIO_LINEA | cut -d',' -f3)
echo "👋 Bienvenido, $NOMBRE ($ROL)"
echo "$NOMBRE,$CORREO,$ROL,$(date +%F_%T)" >> logs/acciones.csv
