import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion Programa Backend de Farma-Car-Sob",
    version: "1.0.0",
    description: "Esta es una API simple documentada con Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/productos.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;