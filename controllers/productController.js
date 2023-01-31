const path = require("path");

const product = (req,res) => {
    res.render(path.resolve(__dirname, "../views/products/productDetail.ejs"))
};

module.exports = {
    product
};