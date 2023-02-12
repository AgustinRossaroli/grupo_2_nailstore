const path = require("path");
const products = require("../data/products.json")

const productCreator = (req,res) => {
    res.render(path.resolve(__dirname, "../views/products/productCreator"))
};

const postProductCreator = (req, res) =>{
    const {
        name,
        description,
        category,
        price,
        image
    } = req.body;

    const newId = products[products.length - 1].id + 1;

    const obj = {
        id: newId,
        name,
        description,
        category,
        price,
        image
    }
    products.push(obj)
    res.redirect("/shop")
}

module.exports = {
    productCreator,
    postProductCreator
};