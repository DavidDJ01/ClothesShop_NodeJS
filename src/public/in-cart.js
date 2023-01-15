
$(document).ready(async function () {

    var lstIdShipment = []
    await $.ajax({
        type: "GET",
        url: "http://localhost:3426/admin/get-shipment",
        success: function (data) {
            var html = null;
            $.each(data, (i, dta) => {
                lstIdShipment.push({ id: dta.idData, quantity: dta.Quantity, price: dta.Price })
            })
        }

    })

    var us_id = ""
    var tongMang = []
    await $.ajax({
        type: "GET",
        url: "/product/get-cart",
        success: function (data) {
            arr_prod = data
            var html = ""
            if (data != null) {
                $.each(data, (i, ele) => {
                    us_id = ele.us_id
                    tongMang.push((parseFloat(ele.priceProd) * parseInt(ele.quantityProd)))
                    html += "<div class='product' style='display: flex;'>"
                        + "<div class='box-leftt'>"
                        + " <img src='/img-product/" + ele.nameImg + "' alt=''>"
                        + " </div>"
                        + " <div class='box-rightt' style = 'padding : 0px 12px'>"
                        + "    <p style = 'font-size:30px; padding: 8px' class = 'giaSP'  data-img = '" + ele.nameImg + "' data-name = '" + ele.nameProd + "' data-id '" + ele.id + "'> " + ele.nameProd + " &nbsp; &nbsp; &nbsp;<span data-price = '" + ele.priceProd + "'>   " + parseFloat(ele.priceProd) * parseInt(ele.quantityProd) + "$ </span></p>"
                        + "    <input type='number' data-id = '" + ele.id + "' data-price = " + ele.priceProd + " class = 'sl-sp' style='width: 300px; padding: 8px 0 ;border: none; border: 1px solid rgba(223, 17, 154, 0.89); margin-right: 20px; text-align: center;' value = '" + ele.quantityProd + "' >"
                        + "    <input type='button' data-idd = '" + ele.id + "' class='btn-delete-e btn btn-danger' style='padding: 4px; margin-bottom: 4px; width: 50px;' value='Xóa'>"
                        + "    <input type='button' data-idd = '" + ele.id + "' data-price = '" + ele.priceProd + "' class='btn-update-e btn btn btn-success' style='padding: 4px; margin-bottom: 4px; width: 70px;'  value='Update'>"
                        + "  </div>"
                        + " </div>"
                })

            }
            $(".ctn").html(html)
        }
    })
    console.log(tongMang)

    $(".sl-sp").each((i, ele) => {
        $(ele).on("change", function () {
            for (var z of lstIdShipment) {
                if (z.id == $(this).data("id")) {
                    if ($(this).val() > z.quantity || $(this).val() <= 0) {
                        $(this).val("0")
                    }
                }
            }
            $(".giaSP span").each((y, el) => {

                if (y == i) {
                    var pricePr = $(el).data("price")
                    var value = $(this).val()
                    var sumPrice = parseFloat(pricePr) * parseInt(value)
                    $(el).text("" + sumPrice + "$$")
                }
            })


        })
    })


    var sumMoney = 0
    for (var i = 0; i < tongMang.length; i++) {
        sumMoney += tongMang[i]
    }
    $(".money h1").text("Thành Tiền: " + sumMoney + "$")

    $(".btn-update-e").each((x, e) => {
        $(e).click(async function () {
            var name = ""
            var imgName = ""
            var id = ""
            var price = ""
            var quantity = ""
            $(".sl-sp").each((i, ele) => {
                if (x == i) {
                    for (var z of lstIdShipment) {
                        if (z.id == $(ele).data("id")) {
                            if ($(ele).val() > z.quantity || $(ele).val() <= 0) {
                                $(ele).val("0")
                            }
                            id = z.id
                            quantity = $(ele).val()
                            price = parseInt($(ele).val()) * parseFloat
                        }
                    }
                    $(".giaSP span").each((y, el) => {
                        if (y == i) {
                            price = $(el).data("price")
                            name = $(el).parent().data("name")
                            imgName = $(el).parent().data("img")

                        }
                    })
                }

            })
            //console.log( {id : id, us_id : us_id, priceProd : SumPrice, name, imgName, quantityProd : quantity, msg : "update" })
            await $.ajax({
                type: "POST",
                url: "/add-product-cart",
                data: { id: id, us_id: us_id, priceProd: price, quantityProd: quantity, nameProd: name, nameImg: imgName, msg: "update" },
                success: function (dta) {
                    alert("Đã Update giỏ hàng")
                }
            })
            console.log({ id: id, us_id: us_id, priceProd: price, quantityProd: quantity, nameProd: name, nameImg: imgName, msg: "update" })
            socket.emit("products-in-cart", "hasData")
        })
    })

    $(".btn-delete-e").each((i, ele) => {

        $(ele).click(async function () {
            var id = ""
            id = $(this).data("idd")
            console.log(id)

            await $.ajax({
                type: "DELETE",
                url: "/delete-cart",
                data: { id , us_id},
                success: function (data) {
                    if (data == null) {
                        alert("Lỗi")
                    } else {
                        alert("Đã xóa")
                    }
                }
            })
            socket.emit("products-in-cart", "hasData")

        })
    })

    if($(".ctn .product")[0] != undefined){
        console.log("true")
        $(".btncheckSM").css("display", "block")
    }else{
        console.log("false")
        $(".ctn").text("Giỏ hàng trống")
        $(".btncheckSM").css("display", "none")
    }
   
    socket.on("has-Product", async function(data){
        var us_id = ""
        var arr_prod_1 = []
        var tongMang = []
            if(data != null){
                await $.ajax({
                    type : "GET",
                    url : "/product/get-cart",
                    success : function(data){
                       arr_prod_1 = data
                       var html = ""
                        if(data != null){
                           $.each(data, (i, ele) => {
                            tongMang.push((parseFloat(ele.priceProd) * parseInt(ele.quantityProd)))
                            us_id = ele.us_id
                            html += "<div class='product' style='display: flex;'>"
                        + "<div class='box-leftt'>"
                        + " <img src='/img-product/" + ele.nameImg + "' alt=''>"
                        + " </div>"
                        + " <div class='box-rightt' style = 'padding : 0px 12px'>"
                        + "    <p style = 'font-size:30px; padding: 8px' class = 'giaSP'  data-img = '" + ele.nameImg + "' data-name = '" + ele.nameProd + "' data-id '" + ele.id + "'> " + ele.nameProd + " &nbsp; &nbsp; &nbsp;<span data-price = '" + ele.priceProd + "'>   " + parseFloat(ele.priceProd) * parseInt(ele.quantityProd) + "$ </span></p>"
                        + "    <input type='number' data-id = '" + ele.id + "' data-price = " + ele.priceProd + " class = 'sl-sp' style='width: 300px; padding: 8px 0 ;border: none; border: 1px solid rgba(223, 17, 154, 0.89); margin-right: 20px; text-align: center;' value = '" + ele.quantityProd + "' >"
                        + "    <input type='button' data-idd = '" + ele.id + "' class='btn-delete-e btn btn-danger' style='padding: 4px; margin-bottom: 4px; width: 50px;' value='Xóa'>"
                        + "    <input type='button' data-idd = '" + ele.id + "' data-price = '" + ele.priceProd + "' class='btn-update-e btn btn btn-success' style='padding: 4px; margin-bottom: 4px; width: 70px;'  value='Update'>"
                        + "  </div>"
                        + " </div>"
                           })
                        }
                        $(".ctn").html(html)
                    }
                  })
                 $(".phone-box span").text(arr_prod_1.length + " sản phẩm")
                 $(".sl-sp").each((i, ele) => {
                    $(ele).on("change", function () {
                        for (var z of lstIdShipment) {
                            if (z.id == $(this).data("id")) {
                                if ($(this).val() > z.quantity || $(this).val() <= 0) {
                                    $(this).val("0")
                                }
                            }
                        }
                        $(".giaSP span").each((y, el) => {
            
                            if (y == i) {
                                var pricePr = $(el).data("price")
                                var value = $(this).val()
                                var sumPrice = parseFloat(pricePr) * parseInt(value)
                                $(el).text("" + sumPrice + "$$")
                            }
                        })
            
            
                    })
                })
                if($(".ctn .product")[0] != undefined){
                    console.log("true")
                    $(".btncheckSM").css("display", "block")
                }else{
                    console.log("false")
                    $(".ctn").text("Giỏ hàng trống")
                    $(".btncheckSM").css("display", "none")
                }
                                 
       $(".btn-delete-e").each((i, ele) => {
             
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
    $(".btn-update-e").each((x, e) => {
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
       var sumMoney = 0
       for (var i = 0; i < tongMang.length; i++) {
           sumMoney += tongMang[i]
       }
       $(".money h1").text("Thành Tiền: " + sumMoney + "$")
             
             }
        })

     

   
        $(".btn-thanhtoan").click(function(){
            $(".form-cart").addClass("openXN")
        })

        $(".form-cart .nav-closee").click(function(){
            $(".form-cart").removeClass("openXN")
        })

        // form Orders

        
        $("input[name = 'btnSubmit']").click(async function(){
           
              var nameCTM = $("input[name = 'nameCTM']").val();
              var telCTM = $("input[name = 'telCTM']").val();
              var address = $("input[name='Address1']").val()+" "+$("input[name='Address2']").val()+" "+$("input[name='Address3']").val();
                $.ajax({
                type : "POST",
                url : "/admin/add-orders",
                data : {nameCTM, telCTM, address},
                success : function(data){
                     if(data.msg == "ok"){   
                         $(".form-cart").removeClass("openXN")
                         alert("Xác nhận thành công ! XIn vui lòng chờ admin duyệt đơn")
                         $(".money h1").text("Thành Tiền: 0$")
                           
                    }else{
                         alert("Đặt hàng thất bại")
                    }
                }       
               })
               socket.emit('thongbaosp', "true")  
               socket.emit("products-in-cart" , "hasData") 
            
        })

})