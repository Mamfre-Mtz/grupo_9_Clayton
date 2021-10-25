const db = require("../database/models");
const User = db.user;

async function userlogged(req, res, next) {
  res.locals.isLogged = false;

  let userCookie = req.cookies.userEmail;
  try {
    let userActive = await User.findOne({ where: { email: userCookie } });

    if (userActive) {
      req.session.userLogged = userActive;
    }

    if (req.session && req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }
  } catch {
    console.log("nel");
  }

  next();
}

module.exports = userlogged;
