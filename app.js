//EXPRESS
const express = require("express");
const app = express();

const methodOverride = require("method-override");

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Ejecutado"));

//EJS 
app.set('view engine','ejs');
//configura la carpeta estatica del proyecto
app.use(express.static('public'));

//FORMULARIOS
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method"))

//MAIN
const mainRouter = require("./routers/mainRouters");
app.use(mainRouter);

//PRODUCTOS 
const productsRouter = require("./routers/productsRouter");
app.use(productsRouter);

//USUARIOS
const usersRouter = require("./routers/usersRouter");
app.use(usersRouter);