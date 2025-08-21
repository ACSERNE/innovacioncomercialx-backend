document.getElementById('btn-generar').addEventListener('click', async () => {
  const url = document.getElementById('badge-url').value.trim();
  const log = document.getElementById('log-estado');
  const preview = document.getElementById('preview-svg');
  const embedHTML = document.getElementById('embed-html');
  const embedMD = document.getElementById('embed-md');
  const embedJSX = document.getElementById('embed-jsx');

  log.textContent = '🔍 Validando badge…';

  try {
    const res = await fetch(url, { method: 'HEAD' });
    const mime = res.headers.get('content-type');
    const status = res.status;

    if (status !== 200 || !mime.includes('svg')) {
      log.textContent = `❌ Error ${status}: No es un SVG válido`;
      preview.src = '';
      return;
    }

    log.textContent = `✅ Badge válido (${status}, ${mime})`;
    preview.src = url;

    // Generar embeds
    embedHTML.value = `<img src="${url}" alt="Badge SVG">`;
    embedMD.value = `![Badge SVG](${url})`;
    embedJSX.value = `<img src="${url}" alt="Badge SVG" />`;

    // Auditoría visual CSV
    const timestamp = new Date().toLocaleString();
    const fila = `"${timestamp}","${url}",${status},"${mime}","embed"\n`;

    // Simulación de registro local (requiere backend para persistencia real)
    console.log('📦 Registro CSV:', fila);

  } catch (err) {
    log.textContent = `⚠️ Error de validación: ${err.message}`;
    preview.src = '';
  }
});
