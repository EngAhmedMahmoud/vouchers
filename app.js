"use strict";
const express = require("express");
const app = express();
if(process.env.NODE_ENV === 'production'){
    require("./app/utils/dbConnection");
}
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    info: {
      title: "Voucher pool service",
      version: "1.0.0",
    },
  },
  apis: ["./app/routes/*"],
};
const swaggerSpecification = swaggerJsdoc(options);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
require("./app/routes")(app);
module.exports = app;
