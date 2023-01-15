const Product = require("../models/Product")
const account = require("../models/Account")
const Category = require("../models/Category");
const shipments = require("../models/Shipment");
const Orders = require("../models/Orders")
const Report = require("../models/Report");
const Shipment = require("../models/Shipment");

class ManagerContactController{
    async index(req, res, next)
   {   
   
         var dta_user = null;
         const dtta = req.cookies.User;
         if(dtta.access != "admin"){
            return res.send("Bạn không có quyền truy cập")
        }
         await account.find({})
             .then(data => {
                 dta_user = data.map(dta => dta.toObject())
             })
             .catch(next)
 
         var tong_SL_Category = []
         await Category.find({}).then(dta => {
             tong_SL_Category = dta.map(ele => ele.toObject())
         })
         var tong_SL_Pro = []
         await Product.find({})
             .then(dta => {
                 tong_SL_Pro = dta.map(ele => ele.toObject())
             })
             .catch(next)
 
         var DonHang = []
         await Orders.find({})
             .then(dta => {
                 for (var x of dta) {
                     if (x.Status == "false") {
                         DonHang.push(x)
                     }
                 }
 
 
             })
 
         return res.render("adminUI/admin_Contact", { tong_SL_User: dta_user, tong_SL_Pro, yAdm: true, dtta, title: "Table List Contact", tong_SL_Category, DonHang })
     
   }
}

module.exports = new ManagerContactController