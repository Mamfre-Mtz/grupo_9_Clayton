const path = require("path");
const multer = require("multer");
//** Multer **
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/img/comic-issues");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

module.exports = upload;
