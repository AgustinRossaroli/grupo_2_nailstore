const express = require("express");
const multer = require("multer");
const rutasMW = require("../middlewares/rutas");
const validaciones =require("../middlewares/validaciones");
const { usersController } = require("../controllers/usersController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage })

const usersRouter = express.Router();

usersRouter.get("/login", usersController.login);
usersRouter.post("/login",validaciones, usersController.loginUser); //validaciones

usersRouter.get("/signUp", usersController.signUp);
usersRouter.post("/signUp", upload.single("image"), usersController.signUpUser);

usersRouter.post('/logout', usersController.logout);

usersRouter.get("/user/:id", rutasMW, usersController.userDetail)

module.exports = usersRouter;