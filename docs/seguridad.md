# Seguridad del Backend ComercialX

## Componentes

### 1. Helmet
Protege cabeceras HTTP contra ataques comunes.

### 2. CORS seguro
Controla quién puede acceder a la API.

### 3. Rate Limiting
Evita ataques por fuerza bruta:
- 100 requests por minuto por IP

### 4. Auditoría
Registra:
- IP
- Fecha
- Método
- Endpoint

### 5. Bloqueo de IPs
Lista negra de IPs sospechosas.

### 6. Integración global
Todo se aplica automáticamente al iniciar el servidor.

