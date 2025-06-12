const authorService = require("../services/author.service");
const AuthorsNotFound = require("../exceptions/authors/authorsNotFoundException");
const EmailService = require("../services/email.service");

const email = new EmailService();

const AuthorIdNotFound = require("../exceptions/authors/invalidAuthorIdException");
const { request } = require("express");

const findAll = async (request, response, next) => {
  try {
    const {
      page = "1",
      pageSize = 10,
      field = "surname",
      order = "asc",
    } = request.query;

    const { totalPages, totalAuthors, authors } = await authorService.findAll(
      page,
      pageSize,
      field,
      order
    );

    if (!authors || authors.length === 0) {
      throw new AuthorsNotFound();
    }

    await email.send("randine95@icloud.com", "ciaoooo", "ciaooooo");

    response.status(200).send({
      statusCode: 200,
      message: "autore trovato",
      page,
      pageSize,
      totalAuthors,
      totalPages,
      authors,
    });
  } catch (error) {
    next(error);
  }
};

const findById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const author = await authorService.findById(id);

    if (!author || author.length === 0) {
      throw new AuthorsNotFound();
    }

    response.status(200).send({
      statusCode: 200,
      message: "autore trovato",
      author,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (request, response) => {
  try {
    const { body } = request;
    const { authorToSave } = await authorService.createAuthor(body);
    console.log(body);

    await email.send(
      `${authorToSave.email}`,
      "Benvenuto",
      `Ciao ${authorToSave.name} e benvenuto nel mio blog!!!!!`
    );
    response.status(201).send({
      statusCode: 201,
      message: "Author correlated",
      authorToSave,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "generic error",
      error: error.message,
    });
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { body } = request;

    const authorToUpdate = await authorService.update(body, id);

    if (!authorToUpdate) {
      throw new AuthorIdNotFound();
    }

    response.status(200).send({
      statusCode: 200,
      message: "Author successfully modified",
      authorToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { avatar } = request.body;

    const authorToUpdateAvatar = await authorService.updateAvatar(id, avatar);

    if (!authorToUpdateAvatar) {
      throw new AuthorIdNotFound();
    }
    response.status(200).send({
      statusCode: 200,
      message: "Author successfully modified",
      authorToUpdateAvatar,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthors = async (request, response, next) => {
  try {
    const { id } = request.params;
    const authorToDelete = await authorService.deleteAuthors(id);

    if (!authorToDelete) {
      throw new AuthorIdNotFound();
    }

    response.status(200).send({
      statusCode: 200,
      message: "autore cancellato con successo",
      authorToDelete,
    });
  } catch (error) {
    next(error);
  }
};

const saveAvatarOnCloud = async (request, response, next) => {
  try {
    response.status(200).send({
      statusCode: 200,
      image: request.file.path,
      fileInfo: request.file,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  findAll,
  create,
  update,
  updateAvatar,
  deleteAuthors,
  findById,
  saveAvatarOnCloud,
};
