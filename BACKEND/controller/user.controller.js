const userService = require("../services/user.service");
const userNotFoundException = require("../exceptions/users/userNotFoundException");

const findAll = async (request, response, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      field = "lastName",
      order = "asc",
    } = request.query;

    const { totalPages, totalUsers, users } = await userService.findAll(
      page,
      pageSize,
      field,
      order
    );

    if (!users || users.length === 0) {
      throw new userNotFoundException();
    }
    response.status(200).send({
      statusCode: 200,
      page,
      pageSize,
      totalPages,
      totalUsers,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const findUserById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await userService.findUserById(id);

    if (!user) {
      throw new userNotFoundException();
    }

    response.status(200).send({
      statusCode: 200,
      message: "uetente trovato con successo",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (request, response) => {
  try {
    const { body } = request;

    const user = await userService.createUser(body);

    response.status(201).send({
      statsuCode: 201,
      message: "utente creato corretamente",
      user,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "errore generico",
      error: error.message,
    });
  }
};

const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const userToDelete = await userService.deleteUser(id);

    if (!userToDelete) {
      return response.status(404).send({
        statusCode: 404,
        message: "utente non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "utente cancellato con sucesso",
      userToDelete,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "errore generico",
      error: error.message,
    });
  }
};

const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;

    const userToUpdate = await userService.updateUser(body, id);

    if (!userToUpdate) {
      return response.status(404).send({
        message: "utente non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "utente modificato con successo",
      userToUpdate,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "errore generico",
      error: error.message,
    });
  }
};

module.exports = {
  findAll,
  createUser,
  deleteUser,
  updateUser,
  findUserById,
};
