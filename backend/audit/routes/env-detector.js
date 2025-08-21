#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const env = process.env.NODE_ENV || 'dev';
const badgeMap = {
  dev: '🟡',
  staging: '🟠',
  prod: '🔴'
};

const inputPath = './backend/audit/routes/routes-map.md';
const outputPath = `./backend/audit/routes/routes-map-${env}.md`;

const md = readFileSync(inputPath, 'utf8');
const lines = md.split('\n').map(line => {
  if (line.startsWith('|') && !line.includes('---')) {
    return line.replace('| ⚪ |', `| ${badgeMap[env]} |`);
  }
  return line;
});

writeFileSync(outputPath, lines.join('\n'));
console.log(`📛 Tabla cockpitizada por entorno (${env}) generada en ${outputPath}`);
