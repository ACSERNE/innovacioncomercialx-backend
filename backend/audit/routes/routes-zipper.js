#!/usr/bin/env node
import AdmZip from 'adm-zip';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const zip = new AdmZip();
const base = './routes-site';

function addFolder(folder, prefix = '') {
  readdirSync(folder).forEach(file => {
    const fullPath = join(folder, file);
    const relPath = join(prefix, file);
    if (statSync(fullPath).isDirectory()) {
      addFolder(fullPath, relPath);
    } else {
      zip.addLocalFile(fullPath, prefix);
    }
  });
}

addFolder(base);
zip.writeZip('./routes-site.zip');
console.log('📦 Micrositio exportado como routes-site.zip');
