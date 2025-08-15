New-Item -ItemType Directory -Force -Path docs | Out-Null

# Validación de export.json
$backend = if ((Invoke-WebRequest -Uri "https://acserne.github.io/innovacioncomercialx-backend/export.json" -Method Head -UseBasicParsing).StatusCode -eq 200) { "OK" } else { "FAIL" }

# Validación de export.zip
$exportzip = if ((Invoke-WebRequest -Uri "https://acserne.github.io/innovacioncomercialx-backend/export.zip" -Method Head -UseBasicParsing).StatusCode -eq 200) { "OK" } else { "FAIL" }

# Validación de Docker local
$docker = if ((docker ps | Select-String "comercialx")) { "OK" } else { "WARN" }

# Generar badges SVG
foreach ($module in "backend", "exportzip", "docker") {
  $status = Get-Variable -Name $module -ValueOnly
  $color = if ($status -eq "OK") { "green" } elseif ($status -eq "WARN") { "orange" } else { "red" }
  @"
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
  <rect width="120" height="20" fill="#555"/>
  <rect x="60" width="60" height="20" fill="$color"/>
  <text x="30" y="14" fill="#fff" font-family="Verdana" font-size="11">$module</text>
  <text x="90" y="14" fill="#fff" font-family="Verdana" font-size="11">$status</text>
</svg>
"@ | Set-Content -Path "docs/badge-$module.svg"
}

# Generar status.json
@"
{
  `"backend`": `"$backend`",
  `"exportzip`": `"$exportzip`",
  `"docker`": `"$docker`",
  `"timestamp`": `"$((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"))`"
}
"@ | Set-Content -Path "docs/status.json"

Write-Host "✅ Validación completada. Badges y status.json generados en docs/"
