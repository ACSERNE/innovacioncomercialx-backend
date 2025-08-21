import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Resolver __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos (badges, ZIPs, logs, etc.)
app.use('/exports', express.static(path.join(__dirname, 'exports')));

// Rutas cockpitizadas por entorno
['dev', 'prod', 'sandbox'].forEach(entorno => {
  app.get(`/${entorno}`, (req, res) => {
    const micrositio = path.join(__dirname, 'exports', entorno, `${entorno}.html`);

    // Validar existencia del micrositio
    if (fs.existsSync(micrositio)) {
      res.sendFile(micrositio);
    } else {
      res.status(404).send(`
        <html>
          <head><title>Micrositio ${entorno} no encontrado</title></head>
          <body style="font-family:sans-serif;padding:2rem;">
            <h1>🚫 Micrositio ${entorno} no encontrado</h1>
            <p>Verificá que <code>${entorno}.html</code> exista en <code>exports/${entorno}/</code></p>
            <p><a href="/">Volver al cockpit</a></p>
          </body>
        </html>
      `);
    }
  });
});

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>ComercialX Cockpit</title></head>
      <body style="font-family:sans-serif;padding:2rem;">
        <h1>🧭 ComercialX Cockpit</h1>
        <ul>
          <li><a href="/dev">Micrositio Dev</a></li>
          <li><a href="/prod">Micrositio Prod</a></li>
          <li><a href="/sandbox">Micrositio Sandbox</a></li>
        </ul>
      </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 ComercialX Cockpit server activo en http://localhost:${PORT}`);
});