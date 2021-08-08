const express = require("express");
const app = express();
const path = require("path");
const rutasProductos = require("./Routes/productosRoutes");
const rutasMain = require("./Routes/mainRoutes");

app.listen(3000, () => {
  console.log("Server 3000 already...");
});

// template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public"));

app.use("/", rutasMain);

app.use("/productos", rutasProductos);
