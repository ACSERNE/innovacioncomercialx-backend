#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const inputPath = './backend/audit/routes/routes-map.json';
const outputPath = './backend/audit/routes/routes-dashboard.md';

const data = JSON.parse(readFileSync(inputPath, 'utf8'));
const total = data.length;
const ok = data.filter(r => r.status === 'OK').length;
const err = data.filter(r => r.status === 'ERR').length;
const coverage = ((ok / total) * 100).toFixed(2);

const badge = coverage >= 90 ? '🟢' : coverage >= 70 ? '🟡' : '🔴';

const md = `
# 📊 Dashboard de Auditoría de Rutas

| Métrica | Valor |
|--------|-------|
| Total de rutas | ${total} |
| Rutas OK | ${ok} |
| Rutas con error | ${err} |
| Cobertura | ${coverage}% ${badge} |

---

## 🔍 Estado por ruta

${data.map(r => `- \`${r.method} ${r.endpoint}\`: ${r.status === 'OK' ? '✅ OK' : '❌ ERR'}`).join('\n')}
`;

writeFileSync(outputPath, md.trim());
console.log(`📊 Dashboard generado en ${outputPath}`);
