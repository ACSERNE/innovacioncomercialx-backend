#!/bin/bash

# 📍 Detectar sistema operativo
OS=$(uname -s)
IS_WINDOWS=false
[[ "$OS" == MINGW64* || "$OS" == MSYS* ]] && IS_WINDOWS=true

# 📁 Ruta del reporte
TRACE="diagnostico/diagnostico_trace.md"
mkdir -p diagnostico
echo "# 🧪 Diagnóstico Técnico" > "$TRACE"
echo "" >> "$TRACE"

# 📅 Fecha
if $IS_WINDOWS; then
  FECHA=$(date)
else
  FECHA=$(date +"%Y-%m-%d %H:%M:%S")
fi
echo "**Fecha:** $FECHA" >> "$TRACE"
echo "" >> "$TRACE"
echo "## 🔍 Resultados" >> "$TRACE"
echo "" >> "$TRACE"
echo "| Módulo         | Estado   |" >> "$TRACE"
echo "|----------------|----------|" >> "$TRACE"

# 🐳 Docker
echo "🔍 Verificando Docker..."
if docker info > /dev/null 2>&1; then
  echo "✅ Docker activo"
  echo "| Docker         | ✅ OK     |" >> "$TRACE"
else
  echo "❌ Docker no disponible"
  echo "| Docker         | ❌ Fallo  |" >> "$TRACE"
fi

# 🩺 Contenedor healthy
echo "🔍 Verificando estado del contenedor PostgreSQL..."
if docker inspect --format='{{.State.Health.Status}}' backend-postgres-1 2>/dev/null | grep -q healthy; then
  echo "✅ Contenedor backend-postgres-1 está healthy"
  echo "| Contenedor     | ✅ Healthy|" >> "$TRACE"
else
  echo "❌ Contenedor backend-postgres-1 no está healthy o no tiene healthcheck"
  echo "| Contenedor     | ❌ Fallo  |" >> "$TRACE"
fi

# 📦 Base de datos mi_db
echo "🔍 Verificando base de datos 'mi_db'..."
if docker exec -i backend-postgres-1 psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'mi_db';" | grep -q 1; then
  echo "✅ Base de datos 'mi_db' existe"
  echo "| Base de datos  | ✅ OK     |" >> "$TRACE"
else
  echo "⚠️ Base de datos 'mi_db' no existe. Creando..."
  docker exec -i backend-postgres-1 psql -U postgres -c "CREATE DATABASE mi_db;" && echo "✅ Base de datos creada"
  echo "| Base de datos  | ⚠️ Creada |" >> "$TRACE"
fi

# 🔌 Conexión PostgreSQL
echo "🔍 Verificando conexión a PostgreSQL..."
if docker exec -i backend-postgres-1 psql -U postgres -d mi_db -c "SELECT 1;" > /dev/null; then
  echo "✅ Conexión a PostgreSQL exitosa"
  echo "| PostgreSQL     | ✅ OK     |" >> "$TRACE"
else
  echo "❌ Error de conexión a PostgreSQL"
  echo "| PostgreSQL     | ❌ Fallo  |" >> "$TRACE"
fi

# 📁 Migraciones
echo "🔍 Verificando migraciones..."
if npx sequelize-cli db:migrate:status | grep -q down; then
  echo "⚠️ Hay migraciones pendientes"
  echo "| Migraciones    | ⚠️ Pend.  |" >> "$TRACE"
else
  echo "✅ Todas las migraciones están aplicadas"
  echo "| Migraciones    | ✅ OK     |" >> "$TRACE"
fi

# 📊 Resumen
echo "" >> "$TRACE"
echo "## 📊 Resumen" >> "$TRACE"
echo "" >> "$TRACE"
echo "- Sistema operativo: $OS" >> "$TRACE"
echo "- Estado general: Validaciones completadas desde terminal" >> "$TRACE"

echo ""
echo "📄 Reporte generado en: $TRACE"
