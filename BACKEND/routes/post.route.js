const verifyToken = require("../middlewares/auth/verifyToken");

{
  const express = require("express");
  const multer = require("multer");
  const posts = express.Router();
  const postsController = require("../controller/post.controller");
  const { upload, cloudUpload } = require("../middlewares/multer/index");

  posts.get("/", postsController.findAll);
  posts.get("/:id", postsController.findPostByid);
  posts.get("/search/category", postsController.findByCategory);
  posts.post("/create", [verifyToken], postsController.createPost);
  posts.post("/create/:id/comments", postsController.addComment);
  posts.delete("/delete/:id/comments", postsController.deleteComment);
  posts.post(
    "/int-upload",
    upload.single("image"),
    postsController.saveFileOnDisk
  );
  posts.post(
    "/cloud-upload",
    cloudUpload.single("image"),
    postsController.saveOnCloud
  );
  posts.delete("/delete/:id", postsController.deletePost);
  posts.put("/update/:id", postsController.updatePost);
  posts.patch("/:id/cover", postsController.updatePostCover);
  module.exports = posts;
}
