@echo off
setlocal EnableDelayedExpansion

echo.
echo 🧑‍✈️ ComercialX Cockpit CLI - Compilador MSI
echo ============================================
echo.

where candle >nul 2>nul
if errorlevel 1 (
    echo ❌ WiX Toolset no está instalado o no está en el PATH.
    echo 🔧 Descárgalo desde: https://wixtoolset.org/releases/
    exit /b 1
)

cd /d "%~dp0wix"

echo 🔧 Ejecutando candle...
candle comercialx.wxs
if errorlevel 1 (
    echo ❌ Error al ejecutar candle. Revisa el archivo .wxs
    exit /b 1
)

echo 🔧 Ejecutando light...
light comercialx.wixobj -o comercialx.msi
if errorlevel 1 (
    echo ❌ Error al generar el .msi. Revisa dependencias o rutas.
    exit /b 1
)

echo.
echo ✅ Instalador cockpitizado generado: comercialx.msi
echo 🖥️ Incluye accesos directos, ícono y registro de instalación.
echo.
pause
