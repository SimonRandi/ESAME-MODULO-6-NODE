const jwt = require("jsonwebtoken");

const invalidOrMissingToken = require("../../exceptions/auth/invaliOrMissingTokenException");

const verifyToken = async (request, response, next) => {
  const token = request.header("authorization");

  if (!token) {
    throw new invalidOrMissingToken();
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    request.user = verifiedToken;
  } catch (error) {
    throw new invalidOrMissingToken();
  }
};

module.exports = verifyToken;
