const express = require("express");
const googleAuth = express.Router();
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20");

const session = require("express-session");

googleAuth.use(
  session({
    secret: process.env.GOOGLE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

googleAuth.use(passport.initialize());
googleAuth.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  })
);
