#!/usr/bin/env node
import { readFileSync } from 'fs';
import https from 'https';

const payload = readFileSync('./backend/audit/routes/routes-status.json', 'utf8');

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
  console.log(`📤 Estado enviado. Status: ${res.statusCode}`);
});

req.on('error', error => {
  console.error(`❌ Error al enviar estado: ${error.message}`);
});

req.write(payload);
req.end();
