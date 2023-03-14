const express = require("express");
const multer = require("multer");

const { usersController } = require("../controllers/usersController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage })

const usersRouter = express.Router();

usersRouter.get("/login", usersController.login);
usersRouter.post("/login", usersController.loginUser);

usersRouter.get("/signUp", usersController.signUp);
usersRouter.post("/signUp", upload.single("image"), usersController.signUpUser);

usersRouter.get("/user/:id", usersController.userDetail)

module.exports = usersRouter;