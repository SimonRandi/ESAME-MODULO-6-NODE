const HTTPSException = require("../indexError");

class AuthorsNotFound extends HTTPSException {
  constructor(
    message = "Author not found",
    statusCode = 404,
    error = "Not authors found in this collection"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = AuthorsNotFound;
