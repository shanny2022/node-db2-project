const express = require("express");
const app = express();
const carsRouter = require("./cars/cars-router");
app.use("/api/cars", carsRouter);
app.use((error, request, response, _next) => { // eslint-disable-line no-unused-vars
    response.status(error.status || 500).json({
      message: error.message,
    });
  });

module.exports = app;
