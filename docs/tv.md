# TV Mode (Pantalla Gigante)

## Endpoint principal
`GET /api/tv`

Devuelve un JSON optimizado para pantallas grandes:

### Ventas del día
- total_ventas
- transacciones
- productos_vendidos

### Últimas transacciones
- id
- total
- hora
- usuario

### Ranking productos
- top 5 productos más vendidos

### Stock crítico
- productos con stock <= 5

### Alertas activas
- no leídas

### Flujo de caja
- ingresos
- egresos
- balance

Este endpoint está optimizado para actualizarse cada 5–10 segundos.
