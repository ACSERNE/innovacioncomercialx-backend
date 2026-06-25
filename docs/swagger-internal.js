const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Innovación Comercial X — API Interna",
      version: "1.0.0",
      description: "Documentación de la API interna (clientes, proveedores, cockpit). No requiere token público."
    },
    servers: [
      { url: "http://localhost:5002/api" }
    ]
  },
  apis: [
    "./routes/*.js"
  ]
};

module.exports = swaggerJsdoc(options);
