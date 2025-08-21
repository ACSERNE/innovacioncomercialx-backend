import { Router } from 'express'

const router = Router()

// 🔐 Middleware JWT simulado
const validarToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token === 'admin-token') {
    req.user = { rol: 'admin' }
  } else if (token === 'cliente-token') {
    req.user = { rol: 'cliente' }
  } else {
    return res.status(401).json({ error: 'Token inválido' })
  }
  next()
}

// 🧠 Log visual por rol
const logAccion = (accion) => (req, res, next) => {
  console.log(`📦 [${req.user.rol}] ${accion} → ${req.method} ${req.url}`)
  next()
}

// 📦 Endpoints cockpitizados
router.get('/', validarToken, logAccion('Listar productos'), (req, res) => {
  res.json([{ id: 1, nombre: 'Producto A' }, { id: 2, nombre: 'Producto B' }])
})

router.post('/', validarToken, logAccion('Crear producto'), (req, res) => {
  res.status(201).json({ mensaje: 'Producto creado', data: req.body })
})

router.put('/:id', validarToken, logAccion('Actualizar producto'), (req, res) => {
  res.json({ mensaje: `Producto ${req.params.id} actualizado`, data: req.body })
})

router.delete('/:id', validarToken, logAccion('Eliminar producto'), (req, res) => {
  res.json({ mensaje: `Producto ${req.params.id} eliminado` })
})

// 🧩 Exportación cockpitizada
export default (app) => app.use('/productos', router)
