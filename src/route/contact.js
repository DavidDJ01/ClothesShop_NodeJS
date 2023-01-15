const express = require("express")
const route = express.Router();
const contactController = require("../app/controllers/ContactController")

route.get("/", contactController.index)

module.exports = route