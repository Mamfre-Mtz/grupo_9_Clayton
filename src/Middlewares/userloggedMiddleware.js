const db = require("../database/models");
const User = db.user;

async function userlogged(req, res, next) {
  res.locals.isLogged = false;

  let userCookie = req.cookies.userEmail;
  try {
    var userActive = await User.findOne({ where: { email: userCookie } });
  } catch {
    console.log("nel");
  }
  if (userActive) {
    req.session.userLogged = userActive;
  }
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userlogged;
