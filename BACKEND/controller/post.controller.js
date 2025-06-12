const { response, request } = require("express");
const postService = require("../services/post.service");
const PostSchema = require("../models/PostSchema");
const PostNotFound = require("../exceptions/post/postNotFoundException");

const findAll = async (request, response, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      field = "category",
      order = "asc",
    } = request.query;

    const { totalPages, totalPosts, posts } = await postService.findAll(
      page,
      pageSize,
      field,
      order
    );

    if (!posts || posts.length === 0) {
      throw new PostNotFound();
    }

    response.status(200).send({
      statusCode: 200,
      page,
      pageSize,
      totalPages,
      totalPosts,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const findPostByid = async (request, response, next) => {
  try {
    const { id } = request.params;
    const post = await PostSchema.findById(id);

    if (!post) {
      throw new PostNotFound();
    }

    response.status(200).send({
      statusCode: 200,
      message: "Post trovato con successo",
      post,
    });
  } catch (error) {
    next(error);
  }
};

const findByCategory = async (request, response, next) => {
  try {
    const { query } = request.query;
    const post = await postService.findByCategory(query);

    if (!post || post.length === 0) {
      throw new PostNotFound();
    }

    response.status(200).send({
      statusCode: 200,
      message: `ecco tutti i post della categoria ${query}`,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (request, response) => {
  try {
    const { body } = request;

    const post = await postService.createPost(body, body.author);

    response.status(201).send({
      statusCode: 201,
      message: "post creato corretamente",
      post,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "errore generico",
      error: error.message,
    });
  }
};

const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    const postToDelete = await postService.deletePost(id);

    if (!postToDelete) {
      return response.status(404).send({
        statusCode: 404,
        message: "post non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "post eliminato con successo",
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "errore generico",
      error: error.message,
    });
  }
};

const updatePost = async (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;
    const postToUpdate = await postService.updatePost(body, id);

    if (!postToUpdate) {
      return response.status(404).send({
        message: "post non trovato",
      });
    }
    response.status(200).send({
      statusCode: 200,
      message: "post modificato con successo",
      postToUpdate,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "errore generico",
      error: error.message,
    });
  }
};

const updatePostCover = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { cover } = request.body;

    const coverToUpdate = await postService.updateCover(id, { cover });

    if (!coverToUpdate) {
      throw new PostNotFound();
    }

    response.status(200).send({
      statusCode: 200,
      message: "Post succesfully modified",
      coverToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

const saveFileOnDisk = async (request, response, next) => {
  try {
    const url = `${request.protocol}://${request.get("host")}`;
    const imgUrl = request.file.filename;

    response.status(200).send({
      statusCode: 200,
      img: `${url}/uploads/${imgUrl}`,
    });
  } catch (error) {
    next(error);
  }
};

const saveOnCloud = async (request, response, next) => {
  try {
    response.status(200).send({
      statusCode: 200,
      image: request.file.path,
      fileInfo: request.file,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findPostByid,
  createPost,
  deletePost,
  updatePost,
  updatePostCover,
  findByCategory,
  saveFileOnDisk,
  saveOnCloud,
};
