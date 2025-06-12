const HTTPSException = require("../indexError");

class AuthorIdNotFound extends HTTPSException {
  constructor(
    message = "Author with that ID is not found",
    statusCode = 404,
    error = "Not authors found in this collection"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = AuthorIdNotFound;
