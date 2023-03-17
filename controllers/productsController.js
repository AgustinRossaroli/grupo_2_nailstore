const { resolveMx } = require("dns");
const { json } = require("express");
const path = require("path");
const products = require("../data/products1.json");
const fs = require("fs");

const productsController = {
    shop: (req, res) => {
        const userSession = req.cookies.userSession;

        if (userSession) {
            res.render(path.join(__dirname, "../views/products/shop"), { "allProducts": products });
        } else {
            res.redirect("/iniciarSesion");
        }
    },
    carrito: (req, res) => {
        const userSession = req.cookies.userSession;

        if (userSession) {
            res.render(path.resolve(__dirname, "../views/products/carrito.ejs"));
        } else {
            res.redirect("/iniciarSesion");
        }
    },
    productCreator: (req, res) => {
        const userSession = req.cookies.userSession;

        if (userSession) {
            res.render(path.resolve(__dirname, "../views/products/productCreator"));
        } else {
            res.redirect("/iniciarSesion");
        }
    },
    postProductCreator: (req, res) => {
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
    },
    filename: path.join(__dirname, "../data/products1.json"),

    getAllProducts: () => {
        return JSON.parse(fs.readFileSync(productsController.filename, "utf-8"));
    },
    editarProducto: (req, res) => {
        const userSession = req.cookies.userSession;

        if (userSession) {
            const { id } = req.params;
            let allProducts = productsController.getAllProducts();

            const editarProducto = allProducts.find(i => i.id == id);

            res.render(path.resolve(__dirname, "../views/products/editarProducto.ejs"), { "editarProducto": editarProducto });
        } else {
            res.redirect("/iniciarSesion");
        }
    },
    confirmarEdicion: (req, res) => {
        let allProducts = productsController.getAllProducts();

        const productoEditado = allProducts.map(i => {
            if (i.id == req.body.id) {
                i.image = req.body.imagen;
                i.name = req.body.nombre;
                i.category = req.body.categoria;
                i.description = req.body.descripcion;
                i.price = req.body.precio;
            };
            return i;
        });
        fs.writeFileSync(productsController.filename, JSON.stringify(productoEditado));
        res.redirect("detalle/" + req.body.id);
    },
    detalle: (req, res) => {
        const userSession = req.cookies.userSession;

        if (userSession) {
            const { id } = req.params;
            let allProducts = productsController.getAllProducts();

            const detalle = allProducts.find(i => i.id == id);

            res.render(path.resolve(__dirname, "../views/products/detalleProducto.ejs"), { detalle });
        } else {
            res.redirect("/iniciarSesion");
        };
    }
};

module.exports = {
    productsController
};