const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const app = express();
const rutasProductos = require("./Routes/productosRoutes");
const rutasMain = require("./Routes/mainRoutes");
const rutasUsuarios = require("./Routes/userRoutes");

app.listen(3000, () => {
  console.log("Server 3000 already...");
});

// template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "shh",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride("_method")); // Pasar poder pasar el method="POST" en el formulario por PUT y DELETE

app.use("/", rutasMain);
app.use("/products", rutasProductos);
app.use("/users", rutasUsuarios);

module.exports = app;
