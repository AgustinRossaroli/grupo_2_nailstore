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
app.use(methodOverride("_method"));

//COOKIES
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//SESSIONS 
const session = require('express-session');
app.use(session({
    secret: 'clave-Secreta', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    maxAge: Date.now() + (1 * 86400 * 1000) 
}));    

//VARIABLES COMUNES
const db = require("./database/models")
app.use(function(req, res, next) {
    const userEmail = req.session.email; 
    
    if (userEmail) {
    db.Users.findOne({where: {email: userEmail}})
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(error)
            next();
        })
    } else {
        res.locals.user = null;
        next()
    }
});

//MAIN
const mainRouter = require("./routers/mainRouters");
app.use(mainRouter);

//PRODUCTOS 
const productsRouter = require("./routers/productsRouter");
app.use(productsRouter);

//USUARIOS
const usersRouter = require("./routers/usersRouter");
app.use(usersRouter);

//API








