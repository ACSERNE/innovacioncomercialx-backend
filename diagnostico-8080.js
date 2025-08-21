import net from 'net'
import fs from 'fs'

const PORT = 8080
const timestamp = new Date().toISOString()

console.log("╭────────────────────────────────────────────╮")
console.log("│ 🔍 ComercialX - Diagnóstico Puerto 8080    │")
console.log("╰────────────────────────────────────────────╯")
console.log(`🕒 Timestamp: ${timestamp}\n`)

const server = net.createServer()

server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Puerto ${PORT} está ocupado.`)
    const markdown = `# 🧾 Diagnóstico Puerto 8080\n\n- Estado: Ocupado\n- Timestamp: ${timestamp}\n- Sugerencia: Verifica si otro backend, servidor web o proxy está usando el puerto.\n\n✍️ *ComercialX Cockpit CLI*\n`
    fs.writeFileSync('puerto-8080.md', markdown)
  } else {
    console.error(`❌ Error inesperado: ${err.message}`)
  }
})

server.once('listening', () => {
  server.close(() => {
    console.log(`✅ Puerto ${PORT} está libre.`)
    const markdown = `# 🧾 Diagnóstico Puerto 8080\n\n- Estado: Libre\n- Timestamp: ${timestamp}\n✍️ *ComercialX Cockpit CLI*\n`
    fs.writeFileSync('puerto-8080.md', markdown)
  })
})

server.listen(PORT)
