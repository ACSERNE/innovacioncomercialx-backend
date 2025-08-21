#!/usr/bin/env node
import { readFileSync } from 'fs';

const actual = JSON.parse(readFileSync('./backend/audit/routes/routes-map.json', 'utf8'));
const errRoutes = actual.filter(r => r.status === 'ERR');

const expected = [
  'GET /api/users',
  'POST /api/login',
  'GET /api/products',
  'DELETE /api/users/:id'
];
const actualSet = new Set(actual.map(r => `${r.method} ${r.endpoint}`));
const missing = expected.filter(r => !actualSet.has(r));

if (errRoutes.length > 0 || missing.length > 0) {
  console.error(`❌ Auditoría fallida:
- Rutas con error: ${errRoutes.length}
- Rutas faltantes: ${missing.length}`);
  process.exit(1);
}

console.log('✅ Auditoría CI/CD completada sin errores');
process.exit(0);
