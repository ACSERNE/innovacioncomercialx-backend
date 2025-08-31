import express from 'express'
import healthRoute from './routes/health.js'

const app = express()

// 🌐 Middleware cockpitizado
app.use(express.json())
app.use((req, res, next) => {
  console.log(`🛰️  [${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// 🧩 Rutas cockpitizadas
healthRoute(app)

// 🎯 Log de arranque visual
const ENV = process.env.NODE_ENV || 'development'
console.log("╭────────────────────────────────────────────╮")
console.log(`│ 🚀 ComercialX Backend iniciado en modo: ${ENV.padEnd(14)} │`)
console.log("╰────────────────────────────────────────────╯")

export default app
