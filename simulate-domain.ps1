$domain = "api.comercialx.io"
$ip = "127.0.0.1"
$hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
$entry = "$ip`t$domain"
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$status = ""

if ((Get-Content $hostsPath) -match $domain) {
  Write-Host "✅ Entrada ya existe en hosts"
  $status += "| Hosts | ✅ Detectado |\n"
} else {
  try {
    Add-Content -Path $hostsPath -Value $entry
    Write-Host "🛠️ Entrada agregada: $entry"
    $status += "| Hosts | ✅ Agregado |\n"
  } catch {
    Write-Host "❌ Error al modificar hosts: $($_.Exception.Message)"
    $status += "| Hosts | ❌ Error |\n"
  }
}

$markdown = "# 🧩 Simulación de Dominio ComercialX\n\n| Componente | Estado        |\n|------------|----------------|\n$status\n🕒 Timestamp: $timestamp\n✍️ *ComercialX Cockpit CLI*"
Set-Content -Path "dns-simulation.md" -Value $markdown
Write-Host "📄 dns-simulation.md exportado correctamente"
