async function main() {
const realizarCompra = require('./realizarCompra');

(async () => {
  const resultado = await realizarCompra(
    '7b91b15c-bbd8-4273-8c18-080997ead3e6', // ← ID del usuario con rol 'user'
    '92e08b44-f3c4-4af2-b68f-15189c79e054', // ← ID de "Galletas Chocochip"
    3 // ← Cantidad deseada (menor al stock de 100)
  );
  console.log(JSON.stringify(resultado, null, 2));
})();}
main()
