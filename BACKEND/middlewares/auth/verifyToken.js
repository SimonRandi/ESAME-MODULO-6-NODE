const jwt = require("jsonwebtoken");

const invalidOrMissingToken = require("../../exceptions/auth/invaliOrMissingTokenException");

const verifyToken = async (request, response, next) => {
  const identity = request.header("authorization");
  if (!identity) {
    throw new invalidOrMissingToken();
  }
  const token = identity.startsWith("Bearer ") ? identity.slice(7) : identity;

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    request.user = verifiedToken;
    next();
  } catch (error) {
    throw new invalidOrMissingToken();
  }
};

module.exports = verifyToken;
