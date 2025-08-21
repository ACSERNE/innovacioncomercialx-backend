export function aplicarFiltros(data, criterios) {
  return data.filter(m => {
    const cumpleTienda = !criterios.tienda || m.tienda === criterios.tienda;
    const cumpleEntorno = !criterios.entorno || m.entorno === criterios.entorno;
    const cumpleSeveridad = !criterios.severidad || m.badge.includes(criterios.severidad);
    const cumpleOperacion = !criterios.operacion || m.nombre.toLowerCase().includes(criterios.operacion);
    return cumpleTienda && cumpleEntorno && cumpleSeveridad && cumpleOperacion;
  });
}

export function exportarFiltrados(modulos, formato = "json") {
  const contenido = formato === "csv"
    ? modulos.map(m => `${m.id},${m.tienda},${m.entorno},${m.badge}`).join("\n")
    : JSON.stringify(modulos, null, 2);

  const blob = new Blob([contenido], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `modulos-filtrados.${formato}`;
  link.click();
}
