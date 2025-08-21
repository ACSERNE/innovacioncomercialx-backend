document.addEventListener("DOMContentLoaded", () => {
  const reportContainer = document.getElementById("report-container");
  reportContainer.innerHTML = "<p>Cargando reportes...</p>";

  setTimeout(() => {
    reportContainer.innerHTML = "<ul><li>Reporte Diario</li><li>Reporte Semanal</li><li>Reporte Mensual</li></ul>";
  }, 1000);
});
