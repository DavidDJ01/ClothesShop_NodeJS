 const Product = require("../models/Product")
 const Shipment = require("../models/Shipment")
class ProductUIController{

       HomePageProduct(req, res, next){
             const dtta = req.cookies.User;
             const hasCart = req.cookies.Product;
             if(dtta != null){
                  if(hasCart != null){
                        for(var cart of hasCart.cartProd){
                              if(cart.us_id == dtta._id){
                                    console.log("true")
                              }
                        }
                  }
                  var dta = dtta
                  return res.render("giaodien/product", {dta, yUser : true})
             }else{
                  return res.render("giaodien/product", {yUser : false})
             }
            
       }

       Cart_Product(req, res, next){
            var arr_cart = []
            var noData = false;
            const dtta = req.cookies.User;
            const hasCart = req.cookies.Product;
            if(hasCart != null && dtta != null){
                  for(var cart of hasCart.cartProd){         
                        if(cart.us_id == dtta._id){
                              arr_cart.push(cart)
                        }
                      
                  }
            }
            else{
                    noData = true;              
            }

            if(noData == false){
                  res.status(200).json(arr_cart)
            }else{
                  res.status(200).json(null)
            }
       }

       PageProduct_1(req, res, next){
            const dtta = req.cookies.User;
             if(dtta != null){
                  var dta = dtta
                  return res.render("giaodien/all-product-page1", {dta, yUser : true})
             }else{
                  return res.render("giaodien/all-product-page1", {yUser : false})
             }
            
       }

      PageDetail(req, res, next){
            var dta = ""
            const dtta = req.cookies.User;

             
            Shipment.findOne({slug : req.params.slug})
            .then((dtaa) => {
                  if(dtta != null){
                        var dta = dtta
                        return res.render("giaodien/detail-product", {data : dtaa.toObject(), dta, yUser : true})
                  }else{
                        return res.render("giaodien/detail-product", {data : dtaa.toObject(), yUser : false})
                  }
                  
            })
           
      }

      PageCart(req, res, next){
            const dtta = req.cookies.User;
             if(dtta != null){
                  var dta = dtta
                  return res.render("giaodien/cart", {dta, yUser : true})
             }else{
                  return res.render("giaodien/cart", {yUser : false})
             }
      }
}

module.exports = new ProductUIController()