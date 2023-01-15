const express = require('express')
const route = express.Router()
const productUiController = require("../app/controllers/ProductUIController")



route.get("/cart", productUiController.PageCart)
route.get("/get-cart", productUiController.Cart_Product)
route.get("/detail-product/:slug", productUiController.PageDetail)
route.get("/home-page", productUiController.HomePageProduct)
route.get("/page-prod-1", productUiController.PageProduct_1)
module.exports = route