const express = require("express");
const rutasMW = require("../middlewares/rutas");
const multer = require("multer")
const path = require("path");

const { productsController } = require("../controllers/productsController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage })

const productsRouter = express.Router();

productsRouter.get("/shop", rutasMW, productsController.shop);
productsRouter.get("/shop/product-creator", rutasMW, productsController.productCreator);
productsRouter.post("/shop/product-creator",upload.single("image"), productsController.postProductCreator)

productsRouter.get("/carrito", rutasMW, productsController.carrito);
productsRouter.post("/carrito/:id", productsController.agregarCarrito);

productsRouter.get("/producto/:id", rutasMW, productsController.detalle);

productsRouter.get("/editar/:id", rutasMW, productsController.editarProducto);
productsRouter.put("/editar",upload.single("imagen"), productsController.confirmarEdicion);

productsRouter.post("/delete/:id", productsController.delete);

productsRouter.post("/deleteProduct/:id", productsController.deleteCart);

module.exports = productsRouter;