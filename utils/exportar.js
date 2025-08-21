import { execSync } from 'node:child_process';
import { writeFileSync, appendFileSync } from 'node:fs';
import path from 'node:path';

export function exportarZIP(nombre, ruta) {
  const zipPath = path.join('exports', `${nombre}.zip`);
  const logPath = path.join('exports', 'export-log.md');
  const timestamp = new Date().toISOString();

  // Registro en log
  const logEntry = `- ✅ ${timestamp} — ${nombre}.zip generado\n`;
  appendFileSync(logPath, logEntry);

  // Comando PowerShell con -Force
  const cmd = `powershell.exe -Command "Compress-Archive -Path '${ruta}.html','${ruta}.md','${ruta}.json','${ruta}.yaml','${ruta}.svg','${ruta}-README.md' -DestinationPath '${zipPath}' -Force"`;

  try {
    execSync(cmd, { stdio: 'ignore' });
  } catch (err) {
    appendFileSync(logPath, `- ❌ ${timestamp} — Error al generar ${nombre}.zip\n`);
  }
}
