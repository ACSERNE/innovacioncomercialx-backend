# 🧭 ComercialX Cockpit

Micrositio técnico modular para auditoría, validación y exportación visual de sistemas. Generado automáticamente desde scripts cockpitizados.

## 📦 Estructura

- `backend.html` — Auditoría de rutas RESTful
- `docker.html` — Estado de contenedores, imágenes y redes
- `entorno.html` — Validación de entorno técnico (Node.js, npm)
- `docs.html` — Auditoría de documentación técnica
- `dashboard.html` — Navegación por módulo con badges SVG
- `monitor.html` — Estado técnico en tiempo real
- `routes-index.html` — Buscador por endpoint, módulo y estado
- `routes-site.json` / `routes-site.yaml` — Índice técnico extendido
- `comercialx-cockpit.zip` — Exportación lista para distribución

## 🖼️ Badges

- `badge-backend.svg`  
- `badge-docker.svg`  
- `badge-entorno.svg`  
- `badge-docs.svg`  
- `badge-status.svg`  
- `badge-export.svg`

## 🚀 Publicación

Puedes desplegar el micrositio en:

- GitHub Pages (`docs/` o `routes-site/`)
- Netlify (`netlify.toml` con `routes-site/` como root)
- Servidor remoto (`scp`, `rsync`, FTP)

## 📤 Webhook

Cada módulo puede simular exportación remota vía `curl` o desde `dashboard.html`.

## 🧪 Validación

```bash
node validate-json.cjs
./validate-cockpit.sh
./generate-cockpit.sh
