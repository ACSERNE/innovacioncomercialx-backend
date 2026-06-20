# Módulo Alertas

## Base URL
`/api/alertas`

---

## GET /api/alertas
**Obtener todas las alertas**

Incluye:
- Producto
- Tipo
- Mensaje
- Estado (leída / no leída)

---

## GET /api/alertas/no-leidas
**Obtener solo alertas no leídas**

---

## PUT /api/alertas/:id/leida
**Marcar alerta como leída**

---

## DELETE /api/alertas/:id
**Eliminar alerta**

---

# Tipos de alertas generadas automáticamente

- **Stock bajo**
- **Producto por vencer**
- **Ventas del día**
- **Rotación lenta**
- **Limpieza mensual**

Estas alertas se generan mediante cronjobs.

