function socket(io, app){
   app.delete("/delete-cart", (req, res) => {
       var arrProd = req.cookies.Product
       if(arrProd != null){
           for(var i = 0; i < arrProd.cartProd.length ; i++){
               if(arrProd.cartProd[i].id == req.body.id && arrProd.cartProd[i].us_id == req.body.us_id){
                    arrProd.cartProd.splice(i, 1)
                    res.cookie("Product", arrProd, {
                        maxAge : 24*60*60*100,
                        httpOnly : false,
                    })
                    res.send("ok")
               }
           }
       }
   })
    
    app.post("/add-product-cart", (req, res )=> {
        var arrProd = req.cookies.Product
        // console.log( arrProd.cartProd[0])
         if(arrProd == null){

            const cart = {
                 cartProd : []
            } 
             cart.cartProd.push(req.body)     
                res.cookie("Product", cart, {
                    maxAge : 24*60*60*100,
                    httpOnly : false,
                })
                return   res.send("ok")
        }else{
              var hasData = false;
              for(var i = 0; i < arrProd.cartProd.length ; i++){
                    if( arrProd.cartProd[i].id == req.body.id && arrProd.cartProd[i].us_id == req.body.us_id ){
                         arrProd.cartProd[i] = {
                            id : req.body.id,
                            nameImg : req.body.nameImg,
                            nameProd : req.body.nameProd,
                            priceProd : req.body.priceProd,
                            quantityProd : req.body.quantityProd,
                            slug : req.body.slug,
                            us_id  : req.body.us_id 
                         }
                         hasData = true;
                         break;
                    }else if(arrProd.cartProd[i].id == req.body.id && arrProd.cartProd[i].us_id == req.body.us_id && req.body.msg == "update"){
                        arrProd.cartProd[i] = {
                            id : req.body.id,
                            nameImg : req.body.nameImg,
                            nameProd : req.body.nameProd,
                            priceProd : req.body.priceProd,
                            quantityProd : req.body.quantityProd,
                            us_id : req.body.us_id
                         }
                         hasData = true;
                         
                         break;
                    }
              }
              if(hasData == false){
                 arrProd.cartProd.push(req.body)
              }
              res.cookie("Product", arrProd, {
                 maxAge : 24*60*60*1000,
                 httpOnly : false,
             })
            //  return   res.redirect("/product/detail-product/"+req.body.slug)
            return res.send("ok")
        }
          
        
    })

    
         io.on('connection', function(socket){
           socket.on("products-in-cart", function(data){
                    console.log(data)
                    socket.emit("has-Product", data)
                    socket.broadcast.emit('has-Product', data)
                 
           })

      
           
      })
   
     
       io.on('connection', function(socket){
          
     })
     
 }
 
 module.exports = socket