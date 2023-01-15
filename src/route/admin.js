const express = require("express")
const route = express.Router();
const homeController = require("../app/controllers/HomeController")
const managerUS = require("../app/controllers/ManagerUSController")
const managerProduct = require("../app/controllers/ManagerProductController")
const managerContactController = require("../app/controllers/ManagerContactController")
const multer = require('multer')
const path = require('path')


const Storage = multer.diskStorage({
    destination : path.join('src\\public\\img-product') ,
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    },
});



uploads = multer({
    storage : Storage,
})

uploadUD = multer({
    storage : Storage,
})




route.patch("/Update_Product", uploads.single("filename"), managerProduct.Update_Product)
route.post('/Add-Product',  uploadUD.single("filename"), managerProduct.Add_Product)
route.get("/export-product", managerProduct.ExportExcellProduct)
route.get("/contact-manager", managerContactController.index)
route.get("/get-product-page/:page" ,managerProduct.GetProductPageSize)
route.delete("/delete-report", managerProduct.DeleteReport)
route.get("/export-data", managerProduct.ExportExcell)
route.get("/get-reports", managerProduct.GetReport)
route.get("/page-reports", managerProduct.PageReport)
route.delete("/delete-order", managerProduct.DeleteOrder)
route.patch("/update-order", managerProduct.UpdateOrders)
route.get("/get-orders", managerProduct.GetOrder)
route.post("/add-orders", managerProduct.AddOrder)
route.get("/orders-list", managerProduct.PageOrders)
route.delete("/delete-shipment", managerProduct.DeleteShipment)
route.get("/get-shipment" ,managerProduct.GetShipment)
route.post("/add-shipment", managerProduct.AddShipment)
route.get("/shipment", managerProduct.ShipmentPage)
route.delete("/delete-category", managerProduct.Delete_Category)
route.patch("/update-category",managerProduct.Update_Category)
route.post("/add-category", managerProduct.Add_Category)
route.get("/list-category", managerProduct.Page_List_Categgory)
route.delete("/Delete-Product", managerProduct.Delete_Product )
route.get("/add-product",managerProduct.pageAddProduct)
route.get("/list-product", managerProduct.index)
route.post("/createUS", managerUS.createUS)
route.delete("/deleteUS",managerUS.deleteUS)
route.patch("/updateUS", managerUS.updateUS)
route.get("/createUI", homeController.createUI)
route.post("/getcode",homeController.getCode)
route.post("/checkcode",homeController.checkCode)
route.post("/sign-out", homeController.signOut)
route.use("/list-user", homeController.getLstUS)
route.post("/login", homeController.login)
route.post("/log-out", homeController.logout)
route.get("/", homeController.admin)

module.exports = route