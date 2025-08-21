import inquirer from 'inquirer'
import fs from 'fs'
import fetch from 'node-fetch'

const usuario = {
  nombre: 'Auditor Ejemplo',
  rol: 'auditor',
  token: 'auditor-token',
  ultimaAccion: 'Exportar log en Markdown',
  timestamp: new Date().toISOString()
}

const menuPorRol = {
  admin: ['Ver productos', 'Crear producto', 'Exportar reporte', 'Salir'],
  cliente: ['Ver productos', 'Salir'],
  auditor: ['Ver productos', 'Exportar reporte', 'Salir']
}

let productosConsultados = []

const mostrarDashboard = async () => {
  console.clear()
  console.log("╭──────────────────────────────╮")
  console.log("│   Dashboard ComercialX      │")
  console.log("│   Logs |   Productos |   Auditoría │")
  console.log("╰──────────────────────────────╯\n")

  console.log("╔════════════════════════════════╗")
  console.log(`║   Usuario: ${usuario.nombre.padEnd(25)}║`)
  console.log(`║   Rol: ${usuario.rol.padEnd(25)}║`)
  console.log(`║   Última acción: ${usuario.ultimaAccion.padEnd(25)}║`)
  console.log(`║   Timestamp: ${usuario.timestamp} ║`)
  console.log("╚════════════════════════════════╝\n")

  const { accion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: `¿Qué desea hacer, ${usuario.nombre}?`,
      choices: menuPorRol[usuario.rol]
    }
  ])

  if (accion === 'Ver productos') {
    try {
      const res = await fetch('http://localhost:3000/productos', {
        headers: { Authorization: `Bearer ${usuario.token}` }
      })
      productosConsultados = await res.json()
      console.log('📦 Productos disponibles:')
      productosConsultados.forEach(p => console.log(`- ${p.nombre}`))
    } catch (err) {
      console.error('❌ Error al conectar con el backend:', err.message)
    }
  }

  if (accion === 'Exportar reporte') {
    let markdown = `# 🧾 Log de Auditoría ComercialX\n\n`
    markdown += `![Rol: Auditor](https://img.shields.io/badge/rol-auditor-blue)\n`
    markdown += `![Acción: Exportar](https://img.shields.io/badge/acción-exportar-success)\n\n`
    markdown += `- **Usuario:** ${usuario.nombre}\n`
    markdown += `- **Rol:** ${usuario.rol}\n`
    markdown += `- **Acción:** ${usuario.ultimaAccion}\n`
    markdown += `- **Timestamp:** ${usuario.timestamp}\n\n`

    if (productosConsultados.length > 0) {
      markdown += `## 📦 Productos consultados\n\n`
      markdown += `| ID | Nombre |\n|----|--------|\n`
      productosConsultados.forEach(p => {
        markdown += `| ${p.id} | ${p.nombre} |\n`
      })
    } else {
      markdown += `> ⚠️ No se consultaron productos en esta sesión.\n`
    }

    markdown += `\n---\n✍️ *Generado por ComercialX Cockpit CLI*\n`

    fs.writeFileSync('auditoria.md', markdown)
    console.log('✅ Log exportado como auditoria.md con tabla y badges')
  }

  if (accion === 'Salir') {
    console.log('👋 Cerrando sesión cockpitizada...')
    process.exit(0)
  }
}

mostrarDashboard()
