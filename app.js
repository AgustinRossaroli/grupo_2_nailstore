const express = require("express");
const app = express();

const path = require("path");

const pathpublic = path.resolve(__dirname, "./public");
app.use(express.static(pathpublic));

app.listen(3000, () => console.log("Ejecutado"));

app.get("/registro.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/registro.html"))
});

