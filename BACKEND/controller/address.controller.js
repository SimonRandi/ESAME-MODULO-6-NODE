const addresService = require("../services/address.service");

const getAllAddress = async (request, response, next) => {
  try {
    const addresses = await addresService.findAll();

    response.status(200).send({
      statusCode: 200,
      addresses,
    });
  } catch (error) {
    next(error);
  }
};

const createNewAddress = async (request, response, next) => {
  try {
    const { body } = request;
    const { id } = request.params;

    const newAddress = await addresService.createAddress(body, id);

    response.status(201).send({
      statusCode: 201,
      message: "Address cretate",
      newAddress,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAddress,
  createNewAddress,
};
