#!/bin/bash

echo "🚀 Generando paquetes ComercialX Cockpit..."

APPNAME="comercialx-cockpit"
VERSION="v1.0.0"
BUILD_DIR="./build"

mkdir -p "$BUILD_DIR"

# 📦 Tarball
tar -czvf "$BUILD_DIR/$APPNAME-$VERSION.tar.gz" frontend backend favicon.ico setup.sh README.md

# 🐧 DEB (estructura mínima)
mkdir -p "$BUILD_DIR/deb/DEBIAN"
cat <<CONTROL > "$BUILD_DIR/deb/DEBIAN/control"
Package: $APPNAME
Version: $VERSION
Architecture: all
Maintainer: Valdez
Description: ComercialX Cockpit multiplataforma
CONTROL

mkdir -p "$BUILD_DIR/deb/usr/share/$APPNAME"
cp -r frontend backend favicon.ico "$BUILD_DIR/deb/usr/share/$APPNAME"
dpkg-deb --build "$BUILD_DIR/deb" "$BUILD_DIR/$APPNAME-$VERSION.deb"

# 🧱 AppImage (estructura básica)
mkdir -p "$BUILD_DIR/appimage/usr/bin"
cp -r frontend backend favicon.ico "$BUILD_DIR/appimage/usr/bin"
echo -e '#!/bin/bash\nxdg-open ./usr/bin/frontend/index.html' > "$BUILD_DIR/appimage/AppRun"
chmod +x "$BUILD_DIR/appimage/AppRun"
echo "ComercialX Cockpit" > "$BUILD_DIR/appimage/.desktop"
# Requiere appimagetool para empaquetar

echo "✅ Paquetes generados en $BUILD_DIR/"
