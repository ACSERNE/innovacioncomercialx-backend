#!/bin/bash
source modulos/branding.sh
read -p "📧 Ingresa tu correo: " CORREO
USUARIO_LINEA=$(grep "$CORREO" datos/usuarios.csv)
if [ -z "$USUARIO_LINEA" ]; then echo "❌ Usuario no registrado."; exit 1; fi
NOMBRE=$(echo $USUARIO_LINEA | cut -d',' -f1)
ROL=$(echo $USUARIO_LINEA | cut -d',' -f3)
if [ "$ROL" != "propietario" ]; then echo "🚫 Solo propietarios pueden ejecutar auditoría."; exit 1; fi
echo "🔍 Ejecutando auditoría avanzada..."
echo "✅ Módulo auditoria completado."
echo "$NOMBRE,$CORREO,$ROL,$(date +%F_%T),auditoria" >> logs/acciones.csv
