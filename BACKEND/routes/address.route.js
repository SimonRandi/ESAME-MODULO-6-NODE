const express = require("express");
const address = express.Router();

const addressController = require("../controller/address.controller");

address.get("/", addressController.getAllAddress);
address.post("/create/:id", addressController.createNewAddress);

module.exports = address;
