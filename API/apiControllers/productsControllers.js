const db = require("../database/models");

const productsController = {
  allProducts: (req, res) => {
    db.Products.findAll()
      .then((products) => {
        const filteredProducts = products.filter((product) => product.category === "Producto");
        const totalProducts = filteredProducts.length;

        const filteredServices = products.filter((product) => product.category === "Servicio");
        const totalServices = filteredServices.length;

        const modifiedProducts = filteredProducts.map((product) => {
          return {
            ...product.dataValues,
            image: `http://localhost:3000/api/products/${product.id}/image`,
            detail: `http://localhost:3000/api/products/${product.id}`,
          };
        });

        const modifiedServices = filteredServices.map((service) => {
          return {
            ...service.dataValues,
            image: `http://localhost:3000/api/products/${service.id}/image`,
            detail: `http://localhost:3000/api/products/${service.id}`,
          };
        });

        return res.json({
          totalProducts: modifiedProducts.length,
          totalServices: modifiedServices.length,
          countByCategory: {
            totalProducts: totalProducts,
            totalServices: totalServices,
          },
          products: modifiedProducts,
          services: modifiedServices,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error interno del servidor");
      });
  },

  productById: (req, res) => {
    const { id } = req.params;
    db.Products.findByPk(id)
      .then((product) => {
        if (product) {
          res.json(product);
        } else {
          res.status(404).send("Producto no encontrado");
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error interno del servidor");
      });
  },
};

module.exports = {
  productsController,
};
