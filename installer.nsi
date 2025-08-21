!define APPNAME "ComercialX Cockpit"
!define APPDIR "$PROGRAMFILES\\ComercialX"

SetCompressor lzma
InstallDir "$APPDIR"

Section "Instalar ComercialX"
  SetOutPath "$INSTDIR"
  File /r frontend\\*
  File /r backend\\*
  File favicon.ico

  WriteRegStr HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${APPNAME}" "DisplayName" "${APPNAME}"
  WriteRegStr HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${APPNAME}" "UninstallString" "$INSTDIR\\uninstall.exe"

  CreateShortCut "$DESKTOP\\ComercialX.lnk" "$INSTDIR\\frontend\\index.html" "" "$INSTDIR\\favicon.ico"
SectionEnd
