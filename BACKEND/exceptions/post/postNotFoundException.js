const HTTPSException = require("../indexError");

class PostNotFound extends HTTPSException {
  constructor(
    statusCode = 404,
    message = "Post not found",
    error = "This post in not in this collection"
  ) {
    super(statusCode, message, error);
  }
}

module.exports = PostNotFound;
