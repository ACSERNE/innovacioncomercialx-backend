# Módulo Categoría

## Base URL
`/api/categorias`

---

## POST /api/categorias
**Crear categoría**

- Body:
  - `nombre` (string)

- Respuestas:
  - 201: Categoría creada
  - 500: Error

---

## GET /api/categorias
**Listar todas las categorías**

Incluye productos asociados.

---

## GET /api/categorias/:id
**Obtener categoría por ID**

---

## PUT /api/categorias/:id
**Actualizar categoría**

---

## DELETE /api/categorias/:id
**Eliminar categoría**

---

# Endpoints especiales

## POST /api/categorias/asignar-producto
**Asignar producto a categoría**

- Body:
  - `categoriaId`
  - `productoId`

---

## GET /api/categorias/:id/productos
**Obtener productos de una categoría**

