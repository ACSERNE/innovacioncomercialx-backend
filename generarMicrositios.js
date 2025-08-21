const fs = require('fs');
const opciones = [
  '🔄 Iniciar sesión',
  '🧑‍💼 Crear nuevo usuario',
  '🆕 Crear nuevo producto',
  '🛒 Publicar producto existente',
  '✏️ Editar producto existente',
  '❌ Eliminar producto',
  '📦 Ver inventario',
  '💰 Flujo de caja',
  '📦 Ver stock por producto',
  '📈 Ver estadísticas generales',
  '🔍 Buscar producto por nombre',
  '📊 Ver reportes filtrados',
  '📝 Exportar auditoría en Markdown',
  '🧾 Filtrar historial de auditoría',
  '🔐 Ver firma local de sesión',
  '🧪 Activar modo sandbox',
  '🤖 Copilot CLI integrado',
  '📈 Ejecutar plugin Analytics',
  '🚪 Cerrar sesión',
  '🚪 Salir del sistema'
];

opciones.forEach(opcion => {
  const nombreArchivo = opcion.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').toLowerCase();
  const contenido = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${opcion}</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <h1>${opcion}</h1>
  <p>Micrositio técnico para la opción <strong>${opcion}</strong>.</p>
  <a href="../index.html">⬅️ Volver al menú principal</a>
</body>
</html>
  `.trim();
  fs.writeFileSync(`docs/opciones/${nombreArchivo}.html`, contenido);
});
