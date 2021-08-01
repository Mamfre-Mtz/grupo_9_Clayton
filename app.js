const express = require("express");
const app = express();
const rutasProductos = require("./Routes/productosRoutes");
const rutasMain = require("./Routes/mainRoutes");

app.listen(3000, () => {
  console.log("Server 3000 already...");
});

/*app.listen(process.env.PORT || 3000,function(){
    console.log("Servidor 3000 corriendo");
})*/

app.use(express.static("public"));

app.use("/", rutasMain);

app.use("/productos", rutasProductos);
