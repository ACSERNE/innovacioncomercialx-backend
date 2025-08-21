#!/bin/bash

clear
echo "
██████╗ ██████╗ ██████╗ ██████╗ ██╗     ██╗  ██╗
██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██║     ██║ ██╔╝
██████╔╝██║   ██║██████╔╝██████╔╝██║     █████╔╝ 
██╔═══╝ ██║   ██║██╔═══╝ ██╔═══╝ ██║     ██╔═██╗ 
██║     ╚██████╔╝██║     ██║     ███████╗██║  ██╗
╚═╝      ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
"

echo "👋 Bienvenido, Innovacion Comercialx (propietario)"
echo "📧 Correo registrado: innovacioncomercialx@gmail.com"
echo "🕓 Fecha de acceso: $(date +%F_%T)"
echo ""
echo "📋 Menú principal cockpitizado:"
echo "  1️⃣ Auditoría avanzada"
echo "  2️⃣ Gestión de soporte"
echo "  3️⃣ Publicar en redes"
echo "  4️⃣ Limpieza inteligente"
echo "  5️⃣ Salir"

read -p "Selecciona una opción [1-5]: " opcion

case $opcion in
  1) bash modulos/auditoria.sh ;;
  2) bash modulos/soporte.sh ;;
  3) bash modulos/redes.sh ;;
  4) bash modulos/limpieza.sh ;;
  5) echo "👋 Cerrando sesión cockpitizada. Hasta pronto." ;;
  *) echo "❌ Opción no válida. Intenta de nuevo." ;;
esac
