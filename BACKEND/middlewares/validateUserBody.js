const { body, validationResult } = require("express-validator");

const userBodyValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("Firstname must be a valid parameter"),
  body("lastName")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("LastName deve essere un parametro valido"),
  body("email")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("The email must be a valid parameter")
    .isEmail()
    .withMessage("The email parameter must be valid and existing"),
  body("password")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("The password must be a valid parameter")
    .isLength({ min: 8 })
    .withMessage("Please insert a password that respects the terms"),
];

const userValidatorMiddleware = async (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).send({
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  userBodyValidation,
  userValidatorMiddleware,
};
