// 🔄 Exportador CSV para dashboard comunitario
(function() {
  const exportarBtn = document.createElement("button");
  exportarBtn.textContent = "📤 Exportar CSV";
  exportarBtn.style = "margin:1rem;padding:0.5rem 1rem;";
  document.body.insertBefore(exportarBtn, document.body.firstChild);

  exportarBtn.addEventListener("click", () => {
    const filas = Array.from(document.querySelectorAll("table tbody tr"));
    const encabezados = Array.from(document.querySelectorAll("table thead th")).map(th => th.textContent.trim());
    const datos = filas.map(tr =>
      Array.from(tr.querySelectorAll("td")).map(td => td.textContent.trim())
    );

    let csv = encabezados.join(",") + "\n";
    datos.forEach(row => {
      csv += row.map(val => `"${val}"`).join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "auditoria-dashboard.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
})();
