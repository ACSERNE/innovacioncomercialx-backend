import net from 'net'
import fs from 'fs'

const puertos = [3000, 3001, 8080]
const timestamp = new Date().toISOString()

console.log("╭────────────────────────────────────────────╮")
console.log("│ 🔍 ComercialX - Detección de Puerto Libre  │")
console.log("╰────────────────────────────────────────────╯")
console.log(`🕒 Timestamp: ${timestamp}\n`)

const verificarPuerto = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => resolve({ port, libre: false }))
    server.once('listening', () => {
      server.close(() => resolve({ port, libre: true }))
    })
    server.listen(port)
  })
}

const main = async () => {
  const resultados = await Promise.all(puertos.map(verificarPuerto))
  let markdown = `# 🧾 Estado de Puertos ComercialX\n\n| Puerto | Estado |\n|--------|--------|\n`

  resultados.forEach(r => {
    const estado = r.libre ? '✅ Libre' : '❌ Ocupado'
    console.log(`🔎 Puerto ${r.port}: ${estado}`)
    markdown += `| ${r.port} | ${estado} |\n`
  })

  markdown += `\n🕒 Timestamp: ${timestamp}\n✍️ *Generado por ComercialX Cockpit CLI*\n`
  fs.writeFileSync('puerto-libre.md', markdown)
  console.log('\n📄 Log exportado como puerto-libre.md')
}

main()
