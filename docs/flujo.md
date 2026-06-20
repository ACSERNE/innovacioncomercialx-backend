# Módulo Flujo de Caja

## Base URL
`/api/flujo`

---

## GET /api/flujo
**Obtener todos los registros de flujo de caja**

---

## POST /api/flujo
**Registrar movimiento de caja**

- Body:
  - `tipo`: 'ingreso' | 'egreso'
  - `monto`: number
  - `descripcion`: string

Ejemplo:
```json
{
  "tipo": "ingreso",
  "monto": 15000,
  "descripcion": "Venta del día"
}
