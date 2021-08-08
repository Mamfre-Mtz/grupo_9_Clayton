const path = require("path");
const controladorMain = {
  register: (req, res) => {
    res.render("registro");
  },
  login: (req, res) => {
    res.render("login");
  },

  index: (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/views/index.html"));
    res.render("index");
  },
};
module.exports = controladorMain;
