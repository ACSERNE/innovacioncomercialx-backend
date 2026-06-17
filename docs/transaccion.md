# Módulo Transacción (Ventas)

## Base URL
`/api/transacciones`

---

## POST /api/transacciones
**Registrar venta**

- Body:
  - `usuarioId` (integer)
  - `productos`: array de objetos:
    - `id` (productoId)
    - `cantidad`

Ejemplo:
```json
{
  "usuarioId": 1,
  "productos": [
    { "id": 2, "cantidad": 3 },
    { "id": 1, "cantidad": 1 }
  ]
}
