const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const controladorMain = require("../Controllers/mainController");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/img/users");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

router.get("/", controladorMain.index);

router.get("/card", controladorMain.card);

// router.get("/login", controladorMain.login);

// router.get("/register", controladorMain.register);
// router.post("/register", upload.single("pp"), controladorMain.newuser);

module.exports = router;
