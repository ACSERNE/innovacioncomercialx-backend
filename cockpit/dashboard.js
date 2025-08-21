async function mostrarDashboard() {
  console.log("╭──────────────────────────────╮")
  console.log("│ 📊 Dashboard ComercialX      │")
  console.log("│ 🧾 Logs | 🛒 Productos | 🔍 Auditoría │")
  console.log("╰──────────────────────────────╯\n")
}

if (typeof module !== 'undefined') {
  module.exports = mostrarDashboard
}

export default mostrarDashboard
