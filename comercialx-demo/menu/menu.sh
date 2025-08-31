#!/bin/bash

while true; do
  clear
  echo "====== MENU PRINCIPAL ======"
  echo "1) Crear archivo"
  echo "2) Listar archivos"
  echo "3) Mostrar fecha y hora"
  echo "4) Mostrar ruta actual"
  echo "5) Salir"
  echo "============================"
  read -p "Seleccione una opción: " opcion

  case $opcion in
    1)
      read -p "Ingrese nombre de archivo: " archivo
      touch "\$archivo"
      echo "Archivo '\$archivo' creado."
      ;;
    2)
      echo "Archivos en el directorio:"
      ls -lh
      ;;
    3)
      echo "Fecha y hora actual: \$(date)"
      ;;
    4)
      echo "Ruta actual: \$(pwd)"
      ;;
    5)
      echo "Saliendo..."
      exit 0
      ;;
    *)
      echo "Opción no válida."
      ;;
  esac
  read -p "Presione [Enter] para continuar..."
done
