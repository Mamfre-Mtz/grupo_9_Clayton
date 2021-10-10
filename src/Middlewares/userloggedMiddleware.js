const User = require("../Models/User");

function userlogged(req, res, next) {
  res.locals.isLogged = false;

  let userCookie = req.cookies.userEmail;
  let userActive = User.findByField("email", userCookie);
  if (userActive) {
    req.session.userLogged = userActive;
  }

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userlogged;
