const db = require("../database/models");

const productsController = {
    allProducts: (req, res) => {
        db.Products.findAll()
            .then((products) => {
                const filteredProducts = products.filter((product) => product.category === "Producto");
                const totalProducts = filteredProducts.length;

                const filteredServices = products.filter((product) => product.category === "Service");
                const totalServices = filteredServices.length;

                const modifiedProducts = filteredProducts.map((product) => {
                    return {
                        ...product.dataValues,
                        detail: "http://localhost:3000/api/products/" + product.id,
                    };
                });

                return res.json({
                    totalProducts: modifiedProducts.length,
                    countByCategory: {
                        totalProducts: totalProducts,
                        totalServices: totalServices,
                    },
                    products: modifiedProducts,
                });
            })
            .catch((error) => console.log(error));
    },
    productById: (req, res) => {
        const { id } = req.params;
        db.Products.findByPk(id)
            .then((product) => res.json(product))
            .catch((error) => console.log(error));
    },
};

module.exports = {
    productsController,
};
