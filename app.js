//EXPRESS
const express = require("express");

const app = express();

app.listen(3001, () => console.log("Ejecutado"));

//EJS 
app.set('view engine','ejs');
//configura la carpeta estatica del proyecto
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//PATH
const path = require("path");
const pathpublic = path.resolve(__dirname, "./public");
app.use(express.static(pathpublic));

app.listen(3000, () => console.log("Ejecutado"));

//INICIAR SESIÓN}
const iSesionRouter = require("./routers/iSesionRouter");
app.use(iSesionRouter);

//CARRITO
const carritoRouter = require("./routers/carritoRouter");
app.use(carritoRouter);

//MAIN
const mainRouter = require("./routers/mainRouters");
app.use(mainRouter);

// //PRODUCT DETAIL
//  const productRouter = require("./routers/productRouter");
//  app.use(productRouter);

//LOGIN 
const loginRouter = require("./routers/loginRouter");
app.use(loginRouter);

//SHOP
const shopRouter = require("./routers/shopRouter");
app.use(shopRouter);

// PRODUCT CREATOR
const productCreatorRouter = require("./routers/productCreatorRouter");
app.use(productCreatorRouter);
