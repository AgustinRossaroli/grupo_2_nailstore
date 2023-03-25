const { resolveMx } = require("dns");
const { json } = require("express");
const path = require("path");
const fs = require("fs");
// const products = require("../data/products1.json");

const productsController = {
    filename: path.join(__dirname, "../data/products1.json"),

    getAllProducts: () => {
        return JSON.parse(fs.readFileSync(productsController.filename, "utf-8"));
    },
    shop: (req, res) => {
            res.render(path.join(__dirname, "../views/products/shop"), { "allProducts": productsController.getAllProducts() });
    },
    carrito: (req, res) => {
            res.render(path.resolve(__dirname, "../views/products/carrito.ejs"), { "allProducts": products });
    },
    productCreator: (req, res) => {
            res.render(path.resolve(__dirname, "../views/products/productCreator"), {"referer": req.headers.referer});
    },
    postProductCreator: (req, res) => {
        const product = productsController.getAllProducts();

        const {name, description, category, price} = req.body;

        const newId = product[product.length - 1].id + 1;
        let image = req.file ? req.file.filename : "productIMG.jpg";

        const obj = {
            id: newId,
            name,
            description,
            image: image,
            category,
            price
        }

        product.push(obj)

        fs.writeFileSync(productsController.filename, JSON.stringify(product, null, " "));

        res.redirect("/shop")
    },
    editarProducto: (req, res) => {
            const { id } = req.params;
            let allProducts = productsController.getAllProducts();

            const editarProducto = allProducts.find(i => i.id == id);

            res.render(path.resolve(__dirname, "../views/products/editarProducto.ejs"), { 
                "editarProducto": editarProducto,
                "referer": req.headers.referer
            });
    },
    confirmarEdicion: (req, res) => {
        let allProducts = productsController.getAllProducts();

        let product = allProducts.find((product) => {
            return product.id == req.body.id;
        })

        const {nombre, descripcion, categoria, precio, imagen} = req.body

        let img = imagen ? imagen : product.image;

        const productoEditado = allProducts.map(i => {
            if (i.id == req.body.id) {
                i.name = nombre;
                i.description = descripcion;
                i.image = img;
                i.category = categoria;
                i.price = precio;
            };
            return i;
        });
        fs.writeFileSync(productsController.filename, JSON.stringify(productoEditado, null, " "));
        res.redirect("producto/" + req.body.id);
    },
    detalle: (req, res) => {
            const { id } = req.params;
            let allProducts = productsController.getAllProducts();

            const detalle = allProducts.find(i => i.id == id);

            res.render(path.resolve(__dirname, "../views/products/detalleProducto.ejs"), { 
                "detalle": detalle,
                "referer": req.headers.referer 
            });;
    }
};

module.exports = {
    productsController
};