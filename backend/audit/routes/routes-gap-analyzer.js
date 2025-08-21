#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const expected = [
  { method: 'GET', endpoint: '/api/users' },
  { method: 'POST', endpoint: '/api/login' },
  { method: 'GET', endpoint: '/api/products' },
  { method: 'DELETE', endpoint: '/api/users/:id' }
];

const actual = JSON.parse(readFileSync('./backend/audit/routes/routes-map.json', 'utf8'));
const actualSet = new Set(actual.map(r => `${r.method} ${r.endpoint}`));

const missing = expected.filter(r => !actualSet.has(`${r.method} ${r.endpoint}`));

const md = `
# 🔍 Comparador de Rutas Esperadas vs Reales

| Método | Endpoint | Estado |
|--------|----------|--------|
${missing.map(r => `| ${r.method} | ${r.endpoint} | ❌ Missing |`).join('\n')}
`;

writeFileSync('./backend/audit/routes/routes-gaps.md', md.trim());
console.log(`🔍 Gaps detectados. Resultado en routes-gaps.md`);
