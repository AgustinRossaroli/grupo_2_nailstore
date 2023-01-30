const express = require("express");

const mainRouter = require("./routers/mainRouters")

const app = express();

const path = require("path");

const pathpublic = path.resolve(__dirname, "./public");
app.use(express.static(pathpublic));

app.get('/', (req, res)=>{
    res.sendFile(
     path.join(__dirname, './views/productCart.html')
    );
 });
app.listen(3000, () => console.log("Ejecutado"));

app.use(mainRouter)




