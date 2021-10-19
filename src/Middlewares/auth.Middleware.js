function authMiddleware(req, res, next) {
  if (!req.session.userLogged) {
    res.redirect("/users/register");
  }
  next();
}

module.exports = authMiddleware;
