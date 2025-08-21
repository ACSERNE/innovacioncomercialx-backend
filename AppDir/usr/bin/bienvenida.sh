#!/bin/bash
source modulos/branding.sh
read -p "📧 Ingresa tu correo: " CORREO
USUARIO_LINEA=$(grep "$CORREO" datos/usuarios.csv)
if [ -z "$USUARIO_LINEA" ]; then echo "❌ Usuario no registrado."; exit 1; fi
NOMBRE=$(echo $USUARIO_LINEA | cut -d',' -f1)
ROL=$(echo $USUARIO_LINEA | cut -d',' -f3)

echo "👋 Bienvenido, $NOMBRE ($ROL)"
echo "🕓 Fecha de acceso: $(date +%F_%T)"
echo ""

if [ "$ROL" = "propietario" ]; then
  echo "📋 Menú cockpitizado para propietario:"
  echo "  1️⃣ Auditoría avanzada"
  echo "  2️⃣ Gestión de soporte"
  echo "  3️⃣ Publicar en redes"
  echo "  4️⃣ Limpieza inteligente"
  echo "  5️⃣ Salir"
else
  echo "📋 Menú básico:"
  echo "  1️⃣ Limpieza inteligente"
  echo "  2️⃣ Salir"
fi

read -p "Selecciona una opción: " opcion

if [ "$ROL" = "propietario" ]; then
  case $opcion in
    1) bash modulos/auditoria.sh ;;
    2) bash modulos/soporte.sh ;;
    3) bash modulos/redes.sh ;;
    4) bash modulos/limpieza.sh ;;
    5) echo "👋 Cerrando sesión cockpitizada. Hasta pronto." ;;
    *) echo "❌ Opción no válida. Intenta de nuevo." ;;
  esac
else
  case $opcion in
    1) bash modulos/limpieza.sh ;;
    2) echo "👋 Cerrando sesión cockpitizada. Hasta pronto." ;;
    *) echo "❌ Opción no válida. Intenta de nuevo." ;;
  esac
fi

echo "$NOMBRE,$CORREO,$ROL,$(date +%F_%T),opción-$opcion" >> logs/acciones.csv
