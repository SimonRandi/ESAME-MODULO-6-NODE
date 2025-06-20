const express = require("express");
const oauth = express.Router();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const oauthController = require("../controller/github.oauth.controller");

oauth.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

oauth.use(passport.initialize());
oauth.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

oauth.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  oauthController.authGithub
);

oauth.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  oauthController.manageOauthCallback
);

module.exports = oauth;
