const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthorNotFound = require("../exceptions/authors/authorsNotFoundException");
const invalidPasswordException = require("../exceptions/auth/inavlidPasswordExcpetion");

const authorModel = require("../models/authorSchema");

const login = async (email, password) => {
  const author = await authorModel.findOne({ email });

  if (!author) {
    throw new AuthorNotFound();
  }

  const isPasswordValid = await bcrypt.compare(password, author.password);

  if (!isPasswordValid) {
    throw new invalidPasswordException();
  }

  const token = jwt.sign(
    {
      name: author.name,
      surName: author.surName,
      email: author.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1m",
    }
  );

  return { token };
};

module.exports = { login };
