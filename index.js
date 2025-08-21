import app from './app.js'
import fs from 'fs'

const config = JSON.parse(fs.readFileSync('./config.json'))
const PORT = config.port || 3000
const ENV = process.env.NODE_ENV || 'development'
const timestamp = new Date().toISOString()

app.listen(PORT, () => {
  console.log("╭────────────────────────────────────────────╮")
  console.log(`│ 🟢 Backend iniciado en http://localhost:${PORT} │`)
  console.log(`│ 🌐 Entorno: ${ENV.padEnd(20)} │`)
  console.log("╰────────────────────────────────────────────╯")

  const markdown = `# 🧾 Estado del Backend\n\n- Puerto: ${PORT}\n- Entorno: ${ENV}\n- Timestamp: ${timestamp}\n✍️ *ComercialX Cockpit CLI*\n`
  fs.writeFileSync('backend-status.md', markdown)
})
