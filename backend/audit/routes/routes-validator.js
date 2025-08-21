#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');

const routes = [
  { method: 'GET', url: '/api/users' },
  { method: 'POST', url: '/api/login' },
  { method: 'GET', url: '/api/unknown' }
];

const baseURL = 'http://localhost:3000';
const logDir = './backend/audit/routes/logs';
const logPath = `${logDir}/routes-validation.md`;

const badge = (status) => {
  if (status === 200) return '🟢';
  if (status === 404) return '🔴';
  if (status === 401) return '🟡';
  return '⚪';
};

const validateRoutes = async () => {
  if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });

  let log = `# 🧪 Validación de rutas\n\n| Método | Endpoint | Estado | Badge | Timestamp |\n|--------|----------|--------|--------|-----------|\n`;

  for (const route of routes) {
    try {
      const res = await axios({ method: route.method, url: baseURL + route.url });
      log += `| ${route.method} | ${route.url} | ${res.status} | ${badge(res.status)} | ${new Date().toISOString()} |\n`;
    } catch (err) {
      const status = err.response?.status || 'ERR';
      log += `| ${route.method} | ${route.url} | ${status} | ${badge(status)} | ${new Date().toISOString()} |\n`;
    }
  }

  writeFileSync(logPath, log);
  console.log(`✅ Validación completada. Log generado en ${logPath}`);
};

validateRoutes();
