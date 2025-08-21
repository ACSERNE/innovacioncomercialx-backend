#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const actual = JSON.parse(readFileSync('./backend/audit/routes/routes-map.json', 'utf8'));
const total = actual.length;
const ok = actual.filter(r => r.status === 'OK').length;
const coverage = ((ok / total) * 100).toFixed(0);

const color = coverage >= 90 ? 'brightgreen' : coverage >= 70 ? 'yellow' : 'red';
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
  <rect width="120" height="20" fill="#555"/>
  <rect x="60" width="60" height="20" fill="${color === 'brightgreen' ? '#4c1' : color === 'yellow' ? '#dfb317' : '#e05d44'}"/>
  <text x="30" y="14" fill="#fff" font-family="Verdana" font-size="11">routes</text>
  <text x="90" y="14" fill="#fff" font-family="Verdana" font-size="11">${coverage}%</text>
</svg>
`;

writeFileSync('./backend/audit/routes/routes-badge.svg', svg.trim());
console.log(`🏷️ Badge generado: routes-badge.svg`);
