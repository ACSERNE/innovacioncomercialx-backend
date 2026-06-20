// Convierte una fecha UTC a la zona local del navegador
const toLocal = (fechaUTC) => {
  return new Date(fechaUTC).toLocaleString('es-CL', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false
  });
};

// Ejemplo de uso en un componente
export default function FechaLocal({ fecha }) {
  return (
    <span>{toLocal(fecha)}</span>
  );
}
