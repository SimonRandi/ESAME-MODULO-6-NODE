const jwt = require("jsonwebtoken");

const authGithub = async (request, response, next) => {
  try {
    const redirectUrl = `${
      process.env.CLIENT_BASE_URL
    }/success?user=${encodeURIComponent(JSON.stringify(request.user))}`;
    response.redirect(redirectUrl);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const manageOauthCallback = async (request, response, next) => {
  try {
    const { user } = request;

    if (!user) {
      return response.redirect("/");
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
    console.log("CLIENT_BASE_URL:", process.env.CLIENT_BASE_URL);
    const redirectUrl = `${
      process.env.CLIENT_BASE_URL
    }/success?token=${encodeURIComponent(token)}`;

    response.redirect(redirectUrl);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authGithub, manageOauthCallback };
