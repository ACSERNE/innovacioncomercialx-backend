
<section id="entorno-banner" style="margin: 1em 0; padding: 1em; background: #222; border-left: 4px solid #00bfff;">
  <strong>🌐 Entorno:</strong> Detectando...
</section>


## 🚀 Publicación visual

### 🐙 GitHub Pages

1. Asegúrate de tener el micrositio en `exports/dev/dev.html`
2. Publica desde la rama `main` o `gh-pages`:

```bash
git add exports/dev
git commit -m "Micrositio dev listo para GitHub Pages"
git push origin main
```

3. Activa GitHub Pages en la configuración del repositorio:
   - Source: `/exports/dev`
   - URL esperada: `https://<usuario>.github.io/<repositorio>/exports/dev/dev.html`

---

### 🌐 Netlify

1. Instala Netlify CLI si no lo tienes:

```bash
npm install -g netlify-cli
```

2. Publica el micrositio:

```bash
netlify deploy --dir=exports/dev --prod
```

3. URL esperada: `https://<sitio>.netlify.app/exports/dev/dev.html`

---

### 🧪 Localhost

Para pruebas locales:

```bash
npx serve exports/dev
```

Accede en: `http://localhost:3000/dev.html`


## 🚀 Publicación visual

### 🐙 GitHub Pages

1. Asegúrate de tener el micrositio en `exports/dev/dev.html`
2. Publica desde la rama `main` o `gh-pages`:

```bash
git add exports/dev
git commit -m "Micrositio dev listo para GitHub Pages"
git push origin main
```

3. Activa GitHub Pages en la configuración del repositorio:
   - Source: `/exports/dev`
   - URL esperada: `https://<usuario>.github.io/<repositorio>/exports/dev/dev.html`

---

### 🌐 Netlify

1. Instala Netlify CLI si no lo tienes:

```bash
npm install -g netlify-cli
```

2. Publica el micrositio:

```bash
netlify deploy --dir=exports/dev --prod
```

3. URL esperada: `https://<sitio>.netlify.app/exports/dev/dev.html`

---

### 🧪 Localhost

Para pruebas locales:

```bash
npx serve exports/dev
```

Accede en: `http://localhost:3000/dev.html`

