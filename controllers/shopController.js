const path = require("path");
const products = require("../data/products.json");

const shop = (req,res) => {
    res.render(path.join(__dirname, "../views/products/shop"),{"allProducts":products})
};

module.exports = {
    shop
};