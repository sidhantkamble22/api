const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aerowing Vendor API",
      version: "1.0.0",
      description:
        "API documentation for Aerowing Vendor Registration and Vendor Management",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
    tags: [
      {
        name: "Vendors",
        description: "Vendor registration and management APIs",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;