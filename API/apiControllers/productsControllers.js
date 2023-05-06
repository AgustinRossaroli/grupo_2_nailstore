const db = require("../database/models")

const productsController = {

    allProducts: (req, res) => {
    db.Products.findAll()
        .then((products) => res.json({
            totalProducts: products.length,
            products: products,
        })
        .catch((error) => console.log(error))
        )
    },
    productById: ((req, res) => {
        const { id } = req.params;
        db.Products.findByPk(
            id
        )
        .then((product) => res.json(product))
        
    })
}


module.exports = {
    productsController
}