class HTTPSError extends Error {
  constructor(message, statusCode, error) {
    super(message);

    this.statusCode = statusCode;
    this.error = error;
  }
}

module.exports = HTTPSError;
