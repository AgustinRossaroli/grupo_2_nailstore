const express = require("express");
const router = express.Router()
const { list } = require("../apiControllers/usersControllers")

router.get("/", list)

module.exports = router