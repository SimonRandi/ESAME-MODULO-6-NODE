const AuthService = require("../services/auth.service");

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const { token } = await AuthService.login(email, password);

    response.header("authorizzation", token).status(200).send({
      statusCode: 200,
      message: "Login succesfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
