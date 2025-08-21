# 🧪 Diagnóstico de Servicios

- **PostgreSQL**: ❌ Fallo → connect ECONNREFUSED ::1:5432
  - 💡 Sugerencia: Verifica credenciales y si el host es accesible desde el contenedor
- **Redis**: ❌ Fallo → connect ECONNREFUSED ::1:6379
  - 💡 Sugerencia: Verifica si el host "redis" existe o usa IP directa
- **API HTTP**: ❌ Fallo → connect ECONNREFUSED ::1:3000
  - 💡 Sugerencia: Verifica si la API está corriendo y accesible desde el contenedor