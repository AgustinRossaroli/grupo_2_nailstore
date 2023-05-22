const express = require("express");
const router = express.Router()
const { list, userById } = require("../apiControllers/usersControllers")

router.get("/", list)
router.get("/:id", userById)

module.exports = router