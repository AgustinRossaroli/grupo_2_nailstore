//EXPRESS
const express = require("express");

const app = express();



//EJS 
app.set('view engine','ejs');
//configura la carpeta estatica del proyecto
app.use(express.static('public'));

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
