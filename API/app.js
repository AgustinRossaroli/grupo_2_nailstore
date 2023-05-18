const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const productsRouter = require("./apiRoutes/productsRoutes")
const usersRouter = require("./apiRoutes/usersRoutes")
const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log("Conectado"));

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan("dev"))
app.use("/api/users", usersRouter)

app.use("/api",productsRouter)