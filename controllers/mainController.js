const path = require("path");
const productos = require("../data/products1.json");

const main = (req,res) => {
    const producto = productos;
    res.render(path.resolve(__dirname, "../views/index.ejs"), {producto});
};

module.exports = {
    main
};