const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const carsRouter = require("./api/cars/cars-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.send("<h1>Car Dealer API</h1>");
});

module.exports = server;
