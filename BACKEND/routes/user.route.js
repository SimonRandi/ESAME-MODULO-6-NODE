const express = require("express");
const users = express.Router();
const userController = require("../controller/user.controller");
const {
  userBodyValidation,
  userValidatorMiddleware,
} = require("../middlewares/validateUserBody");

users.get("/", userController.findAll);
users.get("/:id", userController.findUserById);
users.post(
  "/create",
  [userBodyValidation, userValidatorMiddleware],
  userController.createUser
);
users.delete("/delete/:id", userController.deleteUser);
users.put("/update/:id", userController.updateUser);

module.exports = users;
