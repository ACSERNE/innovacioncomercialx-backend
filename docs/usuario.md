# Módulo Usuario

## Base URL
`/api/usuarios`

---

## POST /api/usuarios
**Crear usuario**

- Body:
  - `nombre` (string)
  - `correo` (string)
  - `password` (string)
  - `rol` (string, opcional: 'user' | 'admin')

- Respuestas:
  - 201: Usuario creado
  - 500: Error creando usuario

---

## GET /api/usuarios
**Listar todos los usuarios**

- Respuestas:
  - 200: Lista de usuarios
  - 500: Error obteniendo usuarios

---

## GET /api/usuarios/:id
**Obtener usuario por ID**

- Respuestas:
  - 200: Usuario
  - 404: Usuario no encontrado
  - 500: Error

---

## PUT /api/usuarios/:id
**Actualizar usuario**

- Respuestas:
  - 200: Usuario actualizado
  - 500: Error

---

## DELETE /api/usuarios/:id
**Eliminar usuario**

- Respuestas:
  - 200: Usuario eliminado
  - 500: Error

---

## POST /api/usuarios/login
**Login**

- Body:
  - `correo`
  - `password`

- Respuestas:
  - 200: `{ usuario, token }`
  - 401: Credenciales inválidas
  - 500: Error

---

## GET /api/usuarios/:id/ventas
**Ventas por usuario**

- Respuestas:
  - 200: Ventas del usuario
  - 500: Error
