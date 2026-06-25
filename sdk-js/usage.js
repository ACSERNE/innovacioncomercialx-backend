const InnovacionX = require("./index");

(async () => {
  const api = new InnovacionX({
    token: "TU_TOKEN_PUBLICO"
  });

  const productos = await api.getProductos();
  console.log("Productos públicos:", productos);
})();
