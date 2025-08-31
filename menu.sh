#!/bin/bash

while true; do
  clear
  echo "===== MENÚ PRINCIPAL ====="
  echo "1) Opción 1: Ver fecha actual"
  echo "2) Opción 2: Listar archivos"
  echo "3) Opción 3: Mostrar usuarios conectados"
  echo "4) Opción 4: Salir"
  echo "=========================="
  read -p "Elige una opción (1-4): " opcion

  case $opcion in
    1)
      echo "📅 Fecha actual:"
      date
      ;;
    2)
      echo "📂 Archivos en el directorio actual:"
      ls -lh
      ;;
    3)
      echo "👤 Usuarios conectados:"
      who
      ;;
    4)
      echo "👋 Saliendo del programa..."
      break
      ;;
    *)
      echo "❌ Opción inválida, intenta de nuevo."
      ;;
  esac
  echo
  read -p "Presiona ENTER para continuar..."
done
