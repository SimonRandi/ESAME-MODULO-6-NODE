const HTTPSException = require("../indexError");

class invalidPasswordException extends HTTPSException {
  constructor(
    message = "AInvalid password or email provided",
    statusCode = 403,
    error = "Please provide a valid credential"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidPasswordException;
