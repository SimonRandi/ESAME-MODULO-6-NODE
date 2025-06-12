const HTTPSError = require("../indexError");

class UserNotFoundException extends HTTPSError {
  constructor(
    message = "user Not Found",
    statusCode = 404,
    error = "The requested user is not found "
  ) {
    super(message, statusCode, error);
  }
}

module.exports = UserNotFoundException;
