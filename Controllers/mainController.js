const path = require("path");
const controladorMain = {
  blog: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/blog.html"));
  },
  register: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/register.html"));
  },
  login: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/login.html"));
  },

  index: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  },
};
module.exports = controladorMain;
