

$(document).ready(async function(){
    var lstIdShipment = []
    await $.ajax({
        type : "GET",
        url : "http://localhost:3426/admin/get-shipment",
        success : function(data){
            var html = null;
            $.each(data, (i, dta) => {
                lstIdShipment.push({id : dta.idData, quantity : dta.Quantity , price : dta.Price, us_id })
            }) 
        }
  
     })

    var arr_prod = []
    var us_id = ""
   await $.ajax({
     type : "GET",
     url : "/product/get-cart",
     success : function(data){
        arr_prod = data
        var html = ""
         if(data != null){
            $.each(data, (i, ele) => {
                us_id = ele.us_id
                html += " <li class='item li' style='display: flex; padding: 4px 0px; border-bottom: 1px solid #ddd;'>"
                           +"<div class='box-leftt'>"
                          +" <img src='/img-product/"+ ele.nameImg+"' alt=''>"
                           +" </div>"
                          +" <div class='box-rightt' style = 'padding : 0px 12px'>"
                          +"    <p class = 'giaSP'  data-img = '"+ele.nameImg+"' data-name = '" +ele.nameProd+ "' data-id '"+ele.id +"'> " + ele.nameProd + "&nbsp;&nbsp;<span data-price = '" +ele.priceProd+"'>  " +ele.priceProd +"$ </span></p>"
                              +"    <input type='number' data-id = '" +ele.id +"' data-price = "+ele.priceProd+" class = 'sl-sp' style='width: 50px; margin-right : 12px ;border: none; border: 1px solid rgba(223, 17, 154, 0.89); text-align : center' value = '" + ele.quantityProd+"' >"
                       +"    <input type='button' data-idd = '" +ele.id+"' class='btn-delete btn btn-danger' style='padding: 4px; margin-bottom: 4px; width: 50px;' value='Xóa'>"
                       +"    <input type='button' data-idd = '" +ele.id+"' data-price = '" +ele.priceProd+"' class='btn-update btn btn btn-success' style='padding: 4px; margin-bottom: 4px; width: 70px;'  value='Update'>"
                       +"  </div>"
                        +" </li>"
            })

         }
         $("#cart-sidebar").html(html)
     }
   })
 //  console.log(lstIdShipment)
   $(".sl-sp").each((i, ele) => {
       $(ele).on("change", function(){
          for(var z of lstIdShipment){
            if(z.id == $(this).data("id")){
                 if($(this).val() > z.quantity || $(this).val() <= 0 ){
                     $(this).val("0")
                 }          
            }
        }

       })
   })
   $(".btn-update").each((x, e) => {
      $(e).click(async function(){
        var name = ""
        var imgName = ""
        var id = ""
        var price = ""
        var quantity = ""
          $(".sl-sp").each((i, ele) => {
               if(x == i){    
                  for(var z of lstIdShipment){
                      if(z.id == $(ele).data("id")){
                           if($(ele).val() > z.quantity || $(ele).val() <= 0 ){
                               $(ele).val("0")
                           }          
                           id = z.id
                           quantity = $(ele).val()
                          // price = parseInt($(ele).val()) * parseFloat
                      }
                  }
                  $(".giaSP span").each((y, el) => {
                      if( y == i){    
                          price =  $(el).data("price")    
                          name = $(el).parent().data("name")
                          imgName = $(el).parent().data("img")

                      }
                  })
                    }    

                  })
                  //console.log( {id : id, us_id : us_id, priceProd : SumPrice, name, imgName, quantityProd : quantity, msg : "update" })
                  await $.ajax({
                    type : "POST",
                    url : "/add-product-cart",
                    data : {id : id, us_id : us_id, priceProd : price, quantityProd : quantity, nameProd : name, nameImg : imgName , msg : "update" },
                    success : function(dta){
                        alert("Đã Update giỏ hàng")
                    }
                  })
                  console.log({id : id, us_id : us_id, priceProd : price, quantityProd : quantity, nameProd : name, nameImg : imgName , msg : "update" })
                  socket.emit("products-in-cart" , "hasData")
      })
   })
   
   $(".btn-delete").each((i, ele) => {
         
           $(ele).click(async function(){
                 var id = ""
                 id = $(this).data("idd")
                 console.log(id)

                 await $.ajax({
                    type : "DELETE",
                    url : "/delete-cart",
                    data : {id, us_id},
                    success : function(data){
                         if(data == null){
                             alert("Lỗi")
                         }else{

                         }
                    }
           })
           socket.emit("products-in-cart" , "hasData")
          
   })
   })
       
 
   
   socket.on("has-Product", async function(data){
    var us_id = ""
    var arr_prod_1 = []
        if(data != null){
            await $.ajax({
                type : "GET",
                url : "/product/get-cart",
                success : function(data){
                   arr_prod_1 = data
                   var html = ""
                    if(data != null){
                       $.each(data, (i, ele) => {
                        us_id = ele.us_id
                        html += " <li class='item li' style='display: flex; padding: 4px 0px; border-bottom: 1px solid #ddd;'>"
                           +"<div class='box-leftt'>"
                          +" <img src='/img-product/"+ ele.nameImg+"' alt=''>"
                           +" </div>"
                          +" <div class='box-rightt' style = 'padding : 0px 12px'>"
                          +"    <p class = 'giaSP'  data-img = '"+ele.nameImg+"' data-name = '" +ele.nameProd+ "' data-id '"+ele.id +"'> " + ele.nameProd + "&nbsp;&nbsp;<span data-price = '" +ele.priceProd+"'>  " +ele.priceProd +"$ </span></p>"
                              +"    <input type='number' data-id = '" +ele.id +"' data-price = "+ele.priceProd+" class = 'sl-sp' style='width: 50px; margin-right : 12px ;border: none; border: 1px solid rgba(223, 17, 154, 0.89); text-align : center' value = '" + ele.quantityProd+"' >"
                       +"    <input type='button' data-idd = '" +ele.id+"' class='btn-delete btn btn-danger' style='padding: 4px; margin-bottom: 4px; width: 50px;' value='Xóa'>"
                       +"    <input type='button' data-idd = '" +ele.id+"' data-price = '" +ele.priceProd+"' class='btn-update btn btn btn-success' style='padding: 4px; margin-bottom: 4px; width: 70px;'  value='Update'>"
                       +"  </div>"
                        +" </li>"
                       })
                    }
                    $("#cart-sidebar").html(html)
                }
              })
             $(".phone-box span").text(arr_prod_1.length + " sản phẩm")
             $(".sl-sp").each((i, ele) => {
                $(ele).on("change", function(){
                   var sum = ""
                    for(var z of lstIdShipment){
                        if(z.id == $(this).data("id")){
                             if($(this).val() > z.quantity || $(this).val() <= 0 ){
                                 $(this).val("0")
                             }          
                        }
                    }
         
                })
            })
                             
   $(".btn-delete").each((i, ele) => {
         
    $(ele).click(async function(){
          var id = ""
          id = $(this).data("idd")
          console.log(id)

          await $.ajax({
             type : "DELETE",
             url : "/delete-cart",
             data : {id, us_id},
             success : function(data){
                  if(data == null){
                      alert("Lỗi")
                  }else{
                       alert("Đã xóa")
                  }
             }
    })
    socket.emit("products-in-cart" , "hasData")
   
})
})
console.log( "trong socket ",lstIdShipment)
$(".btn-update").each((x, e) => {
    $(e).click(async function(){
      var name = ""
      var imgName = ""
      var id = ""
      var us_idd = ""
      var price = ""
      var SumPrice = null;
      var quantity = ""
        $(".sl-sp").each((i, ele) => {
             if(x == i){    
                for(var z of lstIdShipment){
                    if(z.id == $(ele).data("id")){
                         if($(ele).val() > z.quantity || $(ele).val() <= 0 ){
                             $(ele).val("0")
                         }          
                         id = z.id
                         quantity = $(ele).val()
                         price = parseInt($(ele).val()) * parseFloat
                    }
                }
                $(".giaSP span").each((y, el) => {
                    if( y == i){    
                        price =  $(el).data("price")    
                        name = $(el).parent().data("name")
                        imgName = $(el).parent().data("img")

                    }
                })
                  }    

                })
                console.log( {id : id, us_id : us_id, priceProd : SumPrice, name, imgName, quantityProd : quantity, msg : "update" })
                await $.ajax({
                    type : "POST",
                    url : "/add-product-cart",
                    data : {id : id, us_id : us_id, priceProd : price, quantityProd : quantity, nameProd : name, nameImg : imgName , msg : "update" },
                    success : function(dta){
                        alert("Đã Update giỏ hàng")
                    }
                  })
                socket.emit("products-in-cart" , "hasData")
    })
 })
         
         }
    })
    if(arr_prod != null){
        $(".phone-box span").text(arr_prod.length + " sản phẩm")
    }
  

  async function ajaxx(id, us_id, price, quantity, name, imgName){
  
    
  }

//    console.log("Dữ liệu"+ JSON.stringify(arr_prod))


})