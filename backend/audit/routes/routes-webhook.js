#!/usr/bin/env node
import { readFileSync } from 'fs';
import https from 'https';

const json = readFileSync('./backend/audit/routes/routes-map.json', 'utf8');
const data = JSON.parse(json);
const payload = JSON.stringify({ timestamp: new Date().toISOString(), routes: data });

const options = {
  hostname: 'webhook.site',
  path: '/tu-endpoint-personalizado',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, res => {
  console.log(`📤 Webhook enviado. Status: ${res.statusCode}`);
});

req.on('error', error => {
  console.error(`❌ Error al enviar webhook: ${error.message}`);
});

req.write(payload);
req.end();
