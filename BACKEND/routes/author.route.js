const express = require("express");
const authors = express.Router();
const authorController = require("../controller/author.controller");
const {
  authorBodyValidator,
  authorValidatorMiddleware,
} = require("../middlewares/validateAuthorBody");

const { cloudUpload } = require("../middlewares/multer/index");

authors.get("/", authorController.findAll);
authors.get("/:id", authorController.findById);
authors.post(
  "/create",
  //[authorBodyValidator, authorValidatorMiddleware],
  authorController.create
);
authors.post(
  "/cloud-upload",
  cloudUpload.single("image"),
  authorController.saveAvatarOnCloud
);
authors.put("/update/:id", authorController.update);
authors.patch("/:id/avatar", authorController.updateAvatar);
authors.delete("/delete/:id", authorController.deleteAuthors);

module.exports = authors;
