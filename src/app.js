const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const vendorRoutes = require("./routes/vendorRoutes");
const swaggerSpec = require("./swagger/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Aerowing API is running",
  });
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/vendors", vendorRoutes);

module.exports = app;