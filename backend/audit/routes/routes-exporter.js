#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mdPath = './backend/audit/routes/routes-map.md';
const csvPath = './backend/audit/routes/routes-map.csv';
const jsonPath = './backend/audit/routes/routes-map.json';

const md = readFileSync(mdPath, 'utf8');
const lines = md.split('\n').filter(l => l.startsWith('|') && !l.includes('---'));

const headers = ['method', 'endpoint', 'status'];
const data = lines.slice(1).map(line => {
  const cols = line.split('|').map(c => c.trim());
  return {
    method: cols[1],
    endpoint: cols[2],
    status: cols[3]
  };
});

const csv = [headers.join(',')].concat(data.map(d => `${d.method},${d.endpoint},${d.status}`)).join('\n');
writeFileSync(csvPath, csv);
writeFileSync(jsonPath, JSON.stringify(data, null, 2));

console.log(`📦 Exportación completada:\n - ${csvPath}\n - ${jsonPath}`);
