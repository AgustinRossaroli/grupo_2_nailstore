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
};

module.exports = {
  mainController,
};
