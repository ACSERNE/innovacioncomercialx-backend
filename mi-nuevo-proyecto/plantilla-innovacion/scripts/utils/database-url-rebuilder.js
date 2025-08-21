const readline = require("readline");
const chalk = require("chalk");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\n🔧 Reconstructor seguro de DATABASE_URL\n");

const preguntas = [
  { key: "usuario", texto: "👤 Usuario: " },
  { key: "contraseña", texto: "🔐 Contraseña: ", ocultar: true },
  { key: "host", texto: "🌐 Host (ej: localhost): " },
  { key: "puerto", texto: "🔌 Puerto (ej: 5432): " },
  { key: "db", texto: "📁 Nombre de base de datos: " }
];

let respuestas = {};

function preguntar(index) {
  if (index >= preguntas.length) {
    const passEncoded = encodeURIComponent(respuestas.contraseña);
    const url = `postgres://${respuestas.usuario}:${passEncoded}@${respuestas.host}:${respuestas.puerto}/${respuestas.db}`;
    console.log(chalk.green("\n✅ DATABASE_URL reconstruida:"));
    console.log(chalk.yellowBright(url));
    fs.appendFileSync("./logs/database-url-rebuilder.log", `[${new Date().toISOString()}] ${url}\n`);
    console.log(chalk.blue("📄 Log guardado en logs/database-url-rebuilder.log\n"));
    rl.close();
    return;
  }

  const pregunta = preguntas[index];
  const ocultarEntrada = pregunta.ocultar ? { terminal: true, hideEchoBack: true } : undefined;
  rl.question(pregunta.texto, (respuesta) => {
    respuestas[pregunta.key] = respuesta.trim();
    preguntar(index + 1);
  });
}

preguntar(0);