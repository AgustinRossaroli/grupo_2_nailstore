const path = require("path");

const carrito = (req,res) => {
    res.render(path.resolve(__dirname, "../views/products/carrito.ejs"));
};

module.exports = {
    carrito
};