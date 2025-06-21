const HTTPSException = require("../indexError");

class CommentNotFound extends HTTPSException {
  constructor(
    statusCode = 404,
    message = "Comment not found",
    error = "This post as not comment"
  ) {
    super(statusCode, message, error);
  }
}

module.exports = CommentNotFound;
