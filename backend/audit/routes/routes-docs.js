#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('./backend/audit/routes/routes-map.json', 'utf8'));

const md = `
# 📚 Documentación Técnica de Rutas

Auditoría extendida por endpoint, con método, estado, timestamp y badge visual.

---

${data.map(r => `
## ${r.method} ${r.endpoint}

- **Método:** \`${r.method}\`
- **Endpoint:** \`${r.endpoint}\`
- **Estado:** ${r.status === 'OK' ? '✅ OK' : '❌ ERR'}
- **Badge:** ${r.status === 'OK' ? '🟢' : '🔴'}
- **Timestamp:** ${r.timestamp || 'N/A'}
`.trim()).join('\n\n')}
`;

writeFileSync('./backend/audit/routes/routes-docs.md', md.trim());
console.log(`📚 Documentación generada: routes-docs.md`);
