import net from 'net'
import fs from 'fs'

const puertos = [3000, 3001, 8080, 5000]
const timestamp = new Date().toISOString()

console.log("╭────────────────────────────────────────────╮")
console.log("│ 🔍 ComercialX - Resolución de Puerto       │")
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
  let markdown = `# 🧾 Resolución de Puerto ComercialX\n\n| Puerto | Estado   |\n|--------|----------|\n`

  resultados.forEach(r => {
    const estado = r.libre ? '✅ Libre' : '❌ Ocupado'
    console.log(`🔎 Puerto ${r.port}: ${estado}`)
    markdown += `| ${r.port} | ${estado} |\n`
  })

  const libre = resultados.find(r => r.libre)
  if (!libre) {
    console.error('❌ No hay puertos disponibles.')
    markdown += `\n❌ No hay puertos disponibles.\n`
  } else {
    console.log(`\n✅ Puerto sugerido: ${libre.port}`)
    markdown += `\n✅ Puerto sugerido: ${libre.port}\n`
    const config = { port: libre.port, timestamp }
    fs.writeFileSync('config.json', JSON.stringify(config, null, 2))
    console.log('📄 Configuración actualizada en config.json')
  }

  fs.writeFileSync('puerto-resolver.md', markdown)
  console.log('📄 Log exportado como puerto-resolver.md')
}

main()
