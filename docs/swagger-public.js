const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Innovación Comercial X — API Pública",
      version: "1.0.0",
      description: "API pública para integraciones externas. Requiere token público (x-public-token)."
    },
    servers: [
      { url: "http://localhost:5002/api/public" }
    ]
  },
  apis: [
    "./routes/publicApi.routes.js"
  ]
};

module.exports = swaggerJsdoc(options);
