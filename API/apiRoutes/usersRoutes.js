const express = require("express");
const router = express.Router()
const { allUsers } = require("../apiControllers/usersControllers")

router.get("/", allUsers)

module.exports = router