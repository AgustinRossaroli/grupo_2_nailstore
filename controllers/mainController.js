const path = require("path");
const fs = require("fs");
const db = require("../database/models");

const mainController = {
  main: (req, res) => {

    db.Products.findAll().then((products) => {
      res.render(path.resolve(__dirname, "../views/index.ejs"), {
        "allProducts": products,
      });
    });

  },
  aboutUs: (req, res) => {
    res.render(path.resolve(__dirname, "../views/aboutUs.ejs"));
  },
  search: (req, res) => {
    const query = req.query.q;

    db.Products.findOne({
      where: {name: query}
    }) 
      .then((product) => {
        if (product) {
          const productId = product.id;
          res.redirect("/producto/" + productId);
        } else {
          res.send("Hubo un error, no se encontró el producto: " + query + ", el nombre debe ser exacto")
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Hubo un problema al buscar los productos.' });
      });
  }
};

module.exports = {
  mainController,
};
