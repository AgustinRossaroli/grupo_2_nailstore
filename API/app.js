const express = require("express")
const morgan = require("morgan")
const productsRouter = require("./apiRoutes/productsRoutes")

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log("Conectado"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan("dev"))

app.use("/products", productsRouter)