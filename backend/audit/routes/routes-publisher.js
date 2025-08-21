#!/usr/bin/env node
import { readFileSync } from 'fs';
import https from 'https';

const zipBuffer = readFileSync('./routes-site.zip');

const options = {
  hostname: 'webhook.site', // Reemplaza por tu endpoint real
  path: '/tu-endpoint-personalizado',
  method: 'POST',
  headers: {
    'Content-Type': 'application/zip',
    'Content-Length': zipBuffer.length
  }
};

const req = https.request(options, res => {
  console.log(`📤 ZIP publicado. Status: ${res.statusCode}`);
});

req.on('error', error => {
  console.error(`❌ Error al publicar ZIP: ${error.message}`);
});

req.write(zipBuffer);
req.end();
