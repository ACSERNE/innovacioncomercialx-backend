$domain = "api.comercialx.io"
$ip = "127.0.0.1"
$hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
$entry = "$ip`t$domain"
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$status = ""

# 🛠️ Simular dominio
if ((Get-Content $hostsPath) -match $domain) {
  $status += "| Hosts        | Detectado |\n"
} else {
  try {
    Add-Content -Path $hostsPath -Value $entry
    $status += "| Hosts        | Agregado  |\n"
  } catch {
    $status += "| Hosts        | Error     |\n"
  }
}

# 🔍 Verificar resolución
try {
  if (Test-Connection -ComputerName $domain -Count 1 -Quiet) {
    $status += "| Resolución   | OK        |\n"
  } else {
    $status += "| Resolución   | Falló     |\n"
  }
} catch {
  $status += "| Resolución   | Error     |\n"
}

# 🌐 Verificar backend
try {
  $response = Invoke-WebRequest -Uri "http://$domain:3000" -UseBasicParsing -TimeoutSec 3
  if ($response.StatusCode -eq 200) {
    $status += "| Backend      | OK        |\n"
  } else {
    $status += "| Backend      | HTTP $($response.StatusCode) |\n"
  }
} catch {
  $status += "| Backend      | Sin respuesta |\n"
}

# 📄 Exportar log visual
$markdown = "# ComercialX - Simulación y Verificación\n`n`n| Componente   | Estado        |`n|--------------|----------------|`n$status`n`nTimestamp: $timestamp`n*ComercialX Cockpit CLI*"
Set-Content -Path "simulate-status.md" -Value $markdown
Write-Host "📄 simulate-status.md exportado correctamente"
