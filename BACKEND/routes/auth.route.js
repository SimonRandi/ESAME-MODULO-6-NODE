const express = require("express");
const auth = express.Router();
const authController = require("../controller/auth.controller");

auth.post("/login", authController.login);

module.exports = auth;
