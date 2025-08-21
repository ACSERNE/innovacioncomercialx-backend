document.addEventListener("DOMContentLoaded", () => {
  const resumenDiv = document.getElementById("resumen-data");

  fetch("../data/resumen.json")
    .then(res => res.json())
    .then(data => {
      resumenDiv.innerHTML = `
        <p><strong>Ventas:</strong> $${data.ventas}</p>
        <p><strong>Gastos:</strong> $${data.gastos}</p>
        <p><strong>Balance:</strong> $${data.balance}</p>
      `;
    })
    .catch(err => {
      resumenDiv.innerHTML = "<p>Error al cargar datos</p>";
      console.error(err);
    });

  document.getElementById("descargarPDF").addEventListener("click", () => {
    alert("Descargando PDF...");
  });

  document.getElementById("descargarExcel").addEventListener("click", () => {
    alert("Descargando Excel...");
  });
});
