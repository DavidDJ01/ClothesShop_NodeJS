const express = require("express")
const route = express.Router();
const managerProduct = require("../app/controllers/ManagerProductController")


route.get("/get-product", managerProduct.getProduct)
route.get("/get-list-Category", managerProduct.getListCategory)
module.exports = route