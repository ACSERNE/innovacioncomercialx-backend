#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const actual = JSON.parse(readFileSync('./backend/audit/routes/routes-map.json', 'utf8'));
const total = actual.length;
const ok = actual.filter(r => r.status === 'OK').length;
const err = actual.filter(r => r.status === 'ERR').length;
const coverage = ((ok / total) * 100).toFixed(2);

const status = {
  timestamp: new Date().toISOString(),
  total,
  ok,
  err,
  coverage,
  status: coverage >= 90 ? 'green' : coverage >= 70 ? 'yellow' : 'red'
};

writeFileSync('./backend/audit/routes/routes-status.json', JSON.stringify(status, null, 2));
console.log(`📡 Status generado: routes-status.json`);
