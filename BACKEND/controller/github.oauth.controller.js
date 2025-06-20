const jwt = require("jsonwebtoken");

const authGithub = async (request, response, next) => {
  try {
    const redirectUrl = `http://localhost:5173/success?user=${encodeURIComponent(
      JSON.stringify(request.user)
    )}`;
    response.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const manageOauthCallback = async (request, response, next) => {
  try {
    const { user } = request;

    if (!user) {
      return response.redirect("/");
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1m" });

    const redirectUrl = `http://localhost:5173/success?token=${encodeURIComponent(
      token
    )}`;

    response.redirect(redirectUrl);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authGithub, manageOauthCallback };
