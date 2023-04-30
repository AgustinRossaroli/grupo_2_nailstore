const { resolveMx } = require("dns");
const { json } = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../database/models");

const productsController = {
    shop: (req, res) => {
        db.Products.findAll()
            .then(data => {
                return res.render(path.join(__dirname, "../views/products/shop"), { "allProducts": data });
            })
    },
    carrito: (req, res) => {
        db.Products.findAll().then((products) => {
            res.render(path.resolve(__dirname, "../views/products/carrito.ejs"), {
              "allProducts": products,
            });
          });    
    },
    productCreator: (req, res) => {
        res.render(path.resolve(__dirname, "../views/products/productCreator"), { "referer": req.headers.referer });
    },
    postProductCreator: (req, res) => {
        const { name, description, category, price } = req.body;

        let image = req.file ? req.file.filename : "productIMG.jpg";

        db.Products.create({
            name,
            description,
            image,
            category,
            price
        })
            .then(newProduct => {
                return res.redirect("/shop");
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ message: `Error al crear el producto: ${error.message}` });
            });
    },
    editarProducto: (req, res) => {
        const { id } = req.params;

        db.Products.findByPk(id)
            .then(data => {
                res.render(path.resolve(__dirname, "../views/products/editarProducto.ejs"), {
                    "editarProducto": data,
                    "referer": req.headers.referer
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ message: `Error al crear el producto: ${error.message}` });
            });
    },
    confirmarEdicion: (req, res) => {
        const { nombre, descripcion, categoria, precio, imagen } = req.body;

        db.Products.update({
            name: nombre,
            description: descripcion,
            category: categoria,
            price: precio
        }, {
            where: { id: req.body.id }
        })
            .then((data) => {
                res.redirect("/shop")
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ message: `Error al editar el producto: ${error.message}` });
            });
    },
    detalle: (req, res) => {
        const { id } = req.params;

        db.Products.findByPk(id)
            .then(product => {
                res.render(path.resolve(__dirname, "../views/products/detalleProducto.ejs"), {
                    "detalle": product,
                    "referer": req.headers.referer
                });;
            })
    },
    delete: (req, res) => {
        const { id } = req.params;

        db.Products.destroy({ where: { id } })
            .then(() => {
                res.redirect("/shop")
            })
            .catch((error) => {
                res.send('Error al eliminar registro:', error);
            });
    }
};

module.exports = {
    productsController
};