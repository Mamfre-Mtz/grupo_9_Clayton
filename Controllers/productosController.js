const path = require('path');
const controlador={
    productos:(req,res)=>{
        res.sendFile(path.join(__dirname, "../public/views/productos.html"));
    },

    carrito:(req,res)=>{
        res.sendFile(path.join(__dirname,"../public/views/carrito.html"));
    }
}

module.exports = controlador;