const { body, validationResult } = require("express-validator");

const authorBodyValidator = [
  body("name")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("Name must be a valid parameter"),

  body("surName")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("SurName must be a valid parameter"),

  body("email")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("The email must be a valid parameter")
    .isEmail()
    .withMessage("The email parameter must be valid and existing"),

  body("dob")
    .notEmpty()
    .withMessage("The parameter is mandatory")
    .isString()
    .withMessage("Date of Birth must be a valid parameter")
    .isDate()
    .withMessage("Date of Birth must be a valid parameter"),

  body("avatar").isString(),
];

const authorValidatorMiddleware = async (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).send({
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  authorBodyValidator,
  authorValidatorMiddleware,
};
