const { resolveMx } = require("dns");
const { json } = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const { log } = require("console");
const { isDataView } = require("util/types");
const { Op } = require('sequelize');


const productsController = {
    shop: (req, res) => {
        db.Products.findAll()
            .then(data => {
                return res.render(path.join(__dirname, "../views/products/shop"), { "allProducts": data });
            })
    },
    carrito: (req, res) => {
        db.Carts.findAll({
            where: { user_id: res.locals.user.id },
            include: [{ model: db.Products, as: "products", required: true }],
            raw: true
        })
            .then(cart => {
                console.log(cart)
                if (!cart) {
                    res.render(path.join(__dirname, "../views/products/carrito.ejs"), {
                        message: "Tu carrito está vacío."
                    });
                } else {
                    const products = cart.map(cart => {
                        return {
                            image: cart["products.image"],
                            name: cart["products.name"],
                            price: cart["products.price"],
                            id: cart["products.id"]
                        }
                    })
                    console.log(products)
                    res.render(path.join(__dirname, "../views/products/carrito.ejs"), {
                        allProducts: products
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    agregarCarrito: (req, res) => {
        const { id } = req.params;
        let user_id = res.locals.user.id;


        db.Carts.create({ user_id })
            .then(data => {

                let product_id = id;
                let cart_id = data.id;

                db.Cart_products.create({
                    cart_id,
                    product_id,
                })
                    .then(() => {
                        res.redirect("/carrito")
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ message: `Error al agregar el producto: ${error.message}` });
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: `Error al agregar el producto: ${error.message}` });
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
        let image = req.file ? req.file.filename : "productIMG.jpg";
        // if(req.file){
        //     update[image] = req.file.filename
        // }

        db.Products.update({
            name: nombre,
            description: descripcion,
            category: categoria,
            price: precio,
            image
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
    },
    deleteCart: (req, res) => {
        const { id } = req.params;
        const userEmail = req.session.email;

        db.Users.findOne({ where: { email: userEmail } })
            .then(user => {
                const userId = user.id;

                db.Carts.findAll({ where: { user_id: userId } })
                    .then(carts => {
                        const cartIds = carts.map(cart => cart.id);

                        return db.Cart_products.destroy({
                            where: {
                                product_id: id,
                                cart_id: { [Op.in]: cartIds }
                            }
                        });
                    })
                    .then(() => {
                        res.redirect("/carrito");
                    })
                })
        //   .catch((error) => {
        //     res.send("Error al eliminar registro: " + error);
        //   });
    }
};

module.exports = {
    productsController
};

