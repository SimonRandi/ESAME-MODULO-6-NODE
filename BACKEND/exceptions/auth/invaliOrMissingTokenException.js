const HTTPSException = require("../indexError");

class invalidOrMissingTokenExcpetion extends HTTPSException {
  constructor(
    message = "Invalid or missing token",
    statusCode = 401,
    error = "Please provide a token"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidOrMissingTokenExcpetion;
