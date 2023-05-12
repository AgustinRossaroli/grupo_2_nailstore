const db = require("../database/models");

const productsController = {
    allProducts: (req, res) => {
        db.Products.findAll().then((products) => {
            products = products.map((e) => {
                return {
                    ...e.dataValues,
                    detail: "http://localhost:3000/api/products/" + e.id,
                };
            });

            return res.json({
                totalProducts: products.length,
                products: products,
            })
                
        }).catch((error) => console.log(error));;
    },
    productById: (req, res) => {
        const { id } = req.params;
        db.Products.findByPk(id).then((product) => res.json(product))
        .catch((error) => console.log(error));;
    },
};

module.exports = {
    productsController,
};
