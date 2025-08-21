const path = require("path");
const fs = require("fs");
const readline = require("readline");

// Opciones disponibles
const options = [
  "logs/v1/database-url-rebuilder.log",
  "logs/v2/database-url-rebuilder.log",
  "logs/desarrollo/database-url-rebuilder.log"
];

// Mostrar el menú al usuario
console.log("\n🌐 Selecciona el log de reconstrucción:");
options.forEach((opt, idx) => {
  console.log(`[${idx + 1}] ${opt}`);
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("\nEscribe el número de opción: ", (answer) => {
  const index = parseInt(answer.trim(), 10) - 1;
  if (index < 0 || index >= options.length) {
    console.log("❌ Opción inválida.");
    rl.close();
    return;
  }

  const selectedPath = path.resolve(__dirname, "../../" + options[index]);
  console.log("\n🧪 Ruta seleccionada: " + selectedPath);

  // Aquí podrías llamar al comparador y seguir con la auditoría
  // por ejemplo: compareDatabaseURL(selectedPath);
  rl.close();
});