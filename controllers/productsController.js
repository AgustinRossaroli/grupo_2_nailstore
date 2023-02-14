const { resolveMx } = require("dns");
const { json } = require("express");
const path = require("path");
const products = require("../data/products1.json");

const shop = (req,res) => {
    res.render(path.join(__dirname, "../views/products/shop"),{"allProducts":products})
};
const carrito = (req,res) => {
    res.render(path.resolve(__dirname, "../views/products/carrito.ejs"));
};
const detalle = (req,res) => {
    const {id} = req.params;

    const detalle = products.find(i => i.id == id);
    
    res.render(path.resolve(__dirname, "../views/products/detalleProducto.ejs"), {detalle});
};
//CREAR PRODUCTO
const productCreator = (req,res) => {
    res.render(path.resolve(__dirname, "../views/products/productCreator"))
};

const postProductCreator = (req, res) =>{
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
}

//EDITAR PRODUCTO
const editarProducto = (req,res) => {
    const { id } = req.params;

    const editarProducto = products.find(i => i.id == id);

    res.render(path.resolve(__dirname, "../views/products/editarProducto.ejs"), {editarProducto});
};
const confirmarEdicion = (req,res) => {
    const productoEditado = products.forEach(i => {
        if (i.id == req.body.id) {
            i.image = req.body.image;
            i.nombre = req.body.name;
            i.categoria = req.body.category;
            i.descripcion = req.body.description;
            i.precio = req.body.price;
        };
    });
    res.redirect("detalle/" + req.body.id);
};

module.exports = {
    carrito,
    editarProducto,
    detalle,
    confirmarEdicion,
    shop,
    productCreator,
    postProductCreator
};