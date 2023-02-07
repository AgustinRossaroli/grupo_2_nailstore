const { resolveMx } = require("dns");
const { json } = require("express");
const path = require("path");
const productos = require("../data/products");

const carrito = (req,res) => {
    res.render(path.resolve(__dirname, "../views/products/carrito.ejs"));
};
const detalle = (req,res) => {
    const {id} = req.params;

    const detalle = productos.find(i => i.id == id);
    
    res.render(path.resolve(__dirname, "../views/products/detalleProducto.ejs"), {detalle});
};
const editarProducto = (req,res) => {
    const { id } = req.params;

    const editarProducto = productos.find(i => i.id == id);

    res.render(path.resolve(__dirname, "../views/products/editarProducto.ejs"), {editarProducto});
};
const confirmarEdicion = (req,res) => {
    const productoEditado = productos.forEach(i => {
        if (i.id == req.body.id) {
            i.imagen = req.body.imagen;
            i.nombre = req.body.nombre;
            i.categoria = req.body.categoria;
            i.descripcion = req.body.descripcion;
            i.precio = req.body.precio;
        };
    });
    res.redirect("detalle/" + req.body.id);
};

module.exports = {
    carrito,
    editarProducto,
    detalle,
    confirmarEdicion
};