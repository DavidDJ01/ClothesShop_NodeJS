const express = require("express")
const route = express.Router();
const aboutController = require("../app/controllers/AboutController")

route.get("/", aboutController.index)

module.exports = route