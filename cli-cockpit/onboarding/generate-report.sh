#!/bin/bash
name="$1"
role="$2"
mkdir -p reports
echo "# Reporte de registro\nUsuario: $name\nRol: $role\nFecha: $(date)" > "reports/$name-$role.md"
