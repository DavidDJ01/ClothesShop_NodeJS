$(document).ready(async function () {
    ///get-product-page/:page
    var count = 1;
    await $.ajax({
        type: "GET",
        url: `http://localhost:3426/admin/get-product-page/${count}`,
        success: function (data) {
            var html = "";
            $.each(data, (i, dta) => {
                html += " <div style = 'overflow: hidden; height: 650px; margin: 0 0 15px 0' class='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-6 product-col'>"
                        + " <div class='product-tile'>"
                        + "  <div class='product-image'>"
                        + "   <a class='thumb-link' href='/img-product/"+dta.image.name+"' title='"+dta.Name+"'>"
                        + "       <div class='swap-on-hover-front-image'>"
                        + "           <img class='img-responsive lazy' src='/img-product/"+dta.image.name+"'"
                        + "                  data-src='/img-product/"+dta.image.name+"' id='img-product'"
                        + "                   alt='"+dta.Name+"'>"
                        + "          </div>"
                        + "       </a>"
                        + "   </div>"
                        + "   <div class='product-des'>"
                        + "        <div class='product-sale'> </div>"
                        + "       <div class='product-desc'>"
                        + "           <a style = 'margin: 15px 0; display: block; font-size: 35px; font-family: Poppins; color : orange ' class='thumb-link' href='/img-product/"+dta.image.name+"' "
                        + "               title='Đầm tiểu thư'>"+dta.Name+"</a>"
                        + "        </div>"
                        + "        <div class='product-pricing' data-price='200000'>"
                        + "           <span style = 'display: block; font-size: 20px;' class='product-discount-price'"
                        + "                title='Đầm tiểu thư'>"+dta.Price+"$</span>"
                        +"              <a data-id = '"+dta.idData+"' data-imgname = '"+dta.image.name+"' data-nameprod = '"+dta.Name+"' data-price = '"+dta.Price+"' data-slug = ' " +dta.slug + "'"
                        +"               class= 'btnAdd' style = 'background: #000;color: white;display: inline-block; padding: 8px 16px; margin-top: 15px; float: right;'>Add Product</a> "
                        +"              <div style = 'clear: both'></div>"
                        + "   </div>"
                        + "   </div>"
                        + "  </div>"
                        + "   </div>"
            })
            $('.row-category.product-items').html(html)
        }

    })

    $("input[name='search']").on("keyup", function(){{
      
        var val_search  = $(this).val().toLowerCase()
        $(".col-xl-3.col-lg-4.col-md-4.col-sm-6.col-xs-6.col-6.product-col").filter(function(){
              $(this).toggle($(this).text().toLowerCase().indexOf(val_search) > -1)
              console.log($(this).val().toLowerCase())
        })
     }})

     $(".sortProd").on("change",function(){
         var arr = [];
         var val = $(this).val().toLowerCase();
         if(val == 1){
            arr = $(".row-category.product-items").children().sort(( a, b ) => {
                 var soA = $(a).children().eq(0).children().eq(1).children().eq(1).text()
                 var soB = $(b).children().eq(0).children().eq(1).children().eq(1).text()
                 return soA < soB ? 1 : -1
            })
         }else if(val == 2){
            arr = $(".row-category.product-items").children().sort(( a, b ) => {
                 var soA = $(a).children().eq(0).children().eq(1).children().eq(1).text()
                 var soB = $(b).children().eq(0).children().eq(1).children().eq(1).text()
                 return soA > soB ? 1 : -1
            })
         }else  if(val == 3){
            arr = $(".row-category.product-items").children().sort(( a, b ) => {
                 var soA = parseInt($(a).children().eq(0).children().eq(1).children().eq(2).text())
                 var soB = parseInt($(b).children().eq(0).children().eq(1).children().eq(2).text())
                 return soA > soB ? 1 : -1
            })
         }else if(val == 4){
            arr = $(".row-category.product-items").children().sort(( a, b ) => {
                 var soA = parseInt($(a).children().eq(0).children().eq(1).children().eq(2).text())
                 var soB = parseInt($(b).children().eq(0).children().eq(1).children().eq(2).text())
                 return soA < soB ? 1 : -1
            })
         }
         $('.row-category.product-items').append(arr)
     })

    

    $(".btnAdd").each((i, ele) => {
        $(ele).click(async function(){
            var id = $(this).data("id")
            var nameImg = $(this).data("imgname")
            var nameProd = $(this).data("nameprod")
            var price= $(this).data("price")
            var slug= $(this).data("slug")
            var quantityProd = 1
            var us_id = $(".user-login").data("iduser")
            if(us_id != null || us_id == ""){
           
          
                var  obJPro = {
                    id,
                    nameImg,
                    nameProd,
                    priceProd : price,
                    quantityProd,
                    slug,
                    us_id 
                }
                  console.log(obJPro)
                    await $.ajax({
                     type : "POST",
                     url : "/add-product-cart",
                     data : obJPro,
                     success : function(dta){
                         alert("Đã thêm vào giỏ hàng")
                     }
                   })
                   socket.emit("products-in-cart" , "hasData")      
             }else{
                 $(".modal").each((i, ele) => {
                     if(i==0){
                       $(ele).addClass("openXN")
                     }
                 })
             }
        })
    })

    $('.btnCount1').click(async function () {
        count = 1;
        $(".btnCount1").parent().attr("class", "active")
        $(".btnCount2").parent().attr("class", "none")
        $(".btnCount3").parent().attr("class", "none")
        $(".btnCountnext").parent().attr("class", "none")
        await $.ajax({
            type: "GET",
            url: `http://localhost:3426/admin/get-product-page/${count}`,
            success: function (data) {
                var html = "";
                $.each(data, (i, dta) => {
                    html += " <div style = 'overflow: hidden; height: 650px; margin: 0 0 15px 0' class='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-6 product-col'>"
                    + " <div class='product-tile'>"
                    + "  <div class='product-image'>"
                    + "   <a class='thumb-link' href='/img-product/"+dta.image.name+"' title='"+dta.Name+"'>"
                    + "       <div class='swap-on-hover-front-image'>"
                    + "           <img class='img-responsive lazy' src='/img-product/"+dta.image.name+"'"
                    + "                  data-src='/img-product/"+dta.image.name+"' id='img-product'"
                    + "                   alt='"+dta.Name+"'>"
                    + "          </div>"
                    + "       </a>"
                    + "   </div>"
                    + "   <div class='product-des'>"
                    + "        <div class='product-sale'> </div>"
                    + "       <div class='product-desc'>"
                    + "           <a style = 'margin: 15px 0; display: block; font-size: 35px; font-family: Poppins; color : orange ' class='thumb-link' href='/img-product/"+dta.image.name+"' "
                    + "               title='Đầm tiểu thư'>"+dta.Name+"</a>"
                    + "        </div>"
                    + "        <div class='product-pricing' data-price='200000'>"
                    + "           <span style = 'display: block; font-size: 20px;' class='product-discount-price'"
                    + "                title='Đầm tiểu thư'>"+dta.Price+"$</span>"
                    +"              <a data-id = '"+dta.idData+"' data-imgname = '"+dta.image.name+"' data-nameprod = '"+dta.Name+"' data-price = '"+dta.Price+"' data-slug = ' " +dta.slug + "'"
                    +"               class= 'btnAdd' style = 'background: #000;color: white;display: inline-block; padding: 8px 16px; margin-top: 15px; float: right;'>Add Product</a> "
                    +"              <div style = 'clear: both'></div>"
                    + "   </div>"
                    + "   </div>"
                    + "  </div>"
                    + "   </div>"
                })
                $('.row-category.product-items').html(html)
            }

        })

        $(".btnAdd").each((i, ele) => {
            $(ele).click(async function(){
                var id = $(this).data("id")
                var nameImg = $(this).data("imgname")
                var nameProd = $(this).data("nameprod")
                var price= $(this).data("price")
                var slug= $(this).data("slug")
                var quantityProd = 1
                var us_id = $(".user-login").data("iduser")
                if(us_id != null || us_id == ""){
               
              
                    var  obJPro = {
                        id,
                        nameImg,
                        nameProd,
                        priceProd : price,
                        quantityProd,
                        slug,
                        us_id 
                    }
                      console.log(obJPro)
                        await $.ajax({
                         type : "POST",
                         url : "/add-product-cart",
                         data : obJPro,
                         success : function(dta){
                             alert("Đã thêm vào giỏ hàng")
                         }
                       })
                       socket.emit("products-in-cart" , "hasData")      
                 }else{
                     $(".modal").each((i, ele) => {
                         if(i==0){
                           $(ele).addClass("openXN")
                         }
                     })
                 }
            })
        })
    })

    $('.btnCount2').click(async function () {
        count = 2;
        $(".btnCount1").parent().attr("class", "none")
        $(".btnCount2").parent().attr("class", "active")
         $(".btnCount3").parent().attr("class", "none")
         $(".btnCountnext").parent().attr("class", "none")
        await $.ajax({
            type: "GET",
            url: `http://localhost:3426/admin/get-product-page/${count}`,
            success: function (data) {
                var html = "";
                $.each(data, (i, dta) => {
                    html += " <div style = 'overflow: hidden; height: 650px; margin: 0 0 15px 0' class='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-6 product-col'>"
                    + " <div class='product-tile'>"
                    + "  <div class='product-image'>"
                    + "   <a class='thumb-link' href='/img-product/"+dta.image.name+"' title='"+dta.Name+"'>"
                    + "       <div class='swap-on-hover-front-image'>"
                    + "           <img class='img-responsive lazy' src='/img-product/"+dta.image.name+"'"
                    + "                  data-src='/img-product/"+dta.image.name+"' id='img-product'"
                    + "                   alt='"+dta.Name+"'>"
                    + "          </div>"
                    + "       </a>"
                    + "   </div>"
                    + "   <div class='product-des'>"
                    + "        <div class='product-sale'> </div>"
                    + "       <div class='product-desc'>"
                    + "           <a style = 'margin: 15px 0; display: block; font-size: 35px; font-family: Poppins; color : orange ' class='thumb-link' href='/img-product/"+dta.image.name+"' "
                    + "               title='Đầm tiểu thư'>"+dta.Name+"</a>"
                    + "        </div>"
                    + "        <div class='product-pricing' data-price='200000'>"
                    + "           <span style = 'display: block; font-size: 20px;' class='product-discount-price'"
                    + "                title='Đầm tiểu thư'>"+dta.Price+"$</span>"
                    +"              <a data-id = '"+dta.idData+"' data-imgname = '"+dta.image.name+"' data-nameprod = '"+dta.Name+"' data-price = '"+dta.Price+"' data-slug = ' " +dta.slug + "'"
                    +"               class= 'btnAdd' style = 'background: #000;color: white;display: inline-block; padding: 8px 16px; margin-top: 15px; float: right;'>Add Product</a> "
                    +"              <div style = 'clear: both'></div>"
                    + "   </div>"
                    + "   </div>"
                    + "  </div>"
                    + "   </div>"
                })
                $('.row-category.product-items').html(html)
            }

        })

        $(".btnAdd").each((i, ele) => {
            $(ele).click(async function(){
                var id = $(this).data("id")
                var nameImg = $(this).data("imgname")
                var nameProd = $(this).data("nameprod")
                var price= $(this).data("price")
                var slug= $(this).data("slug")
                var quantityProd = 1
                var us_id = $(".user-login").data("iduser")
                if(us_id != null || us_id == ""){
               
              
                    var  obJPro = {
                        id,
                        nameImg,
                        nameProd,
                        priceProd : price,
                        quantityProd,
                        slug,
                        us_id 
                    }
                      console.log(obJPro)
                        await $.ajax({
                         type : "POST",
                         url : "/add-product-cart",
                         data : obJPro,
                         success : function(dta){
                             alert("Đã thêm vào giỏ hàng")
                         }
                       })
                       socket.emit("products-in-cart" , "hasData")      
                 }else{
                     $(".modal").each((i, ele) => {
                         if(i==0){
                           $(ele).addClass("openXN")
                         }
                     })
                 }
            })
        })
    })

    $('.btnCount3').click(async function () {
        count = 3;
         $(".btnCount1").parent().attr("class", "none")
         $(".btnCount2").parent().attr("class", "none")
         $(".btnCount3").parent().attr("class", "active")
         $(".btnCountnext").parent().attr("class", "none")
        await $.ajax({
            type: "GET",
            url: `http://localhost:3426/admin/get-product-page/${count}`,
            success: function (data) {
                var html = "";
                $.each(data, (i, dta) => {
                    html += " <div style = 'overflow: hidden; height: 650px; margin: 0 0 15px 0' class='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-6 product-col'>"
                    + " <div class='product-tile'>"
                    + "  <div class='product-image'>"
                    + "   <a class='thumb-link' href='/img-product/"+dta.image.name+"' title='"+dta.Name+"'>"
                    + "       <div class='swap-on-hover-front-image'>"
                    + "           <img class='img-responsive lazy' src='/img-product/"+dta.image.name+"'"
                    + "                  data-src='/img-product/"+dta.image.name+"' id='img-product'"
                    + "                   alt='"+dta.Name+"'>"
                    + "          </div>"
                    + "       </a>"
                    + "   </div>"
                    + "   <div class='product-des'>"
                    + "        <div class='product-sale'> </div>"
                    + "       <div class='product-desc'>"
                    + "           <a style = 'margin: 15px 0; display: block; font-size: 35px; font-family: Poppins; color : orange ' class='thumb-link' href='/img-product/"+dta.image.name+"' "
                    + "               title='Đầm tiểu thư'>"+dta.Name+"</a>"
                    + "        </div>"
                    + "        <div class='product-pricing' data-price='200000'>"
                    + "           <span style = 'display: block; font-size: 20px;' class='product-discount-price'"
                    + "                title='Đầm tiểu thư'>"+dta.Price+"$</span>"
                    +"              <a data-id = '"+dta.idData+"' data-imgname = '"+dta.image.name+"' data-nameprod = '"+dta.Name+"' data-price = '"+dta.Price+"' data-slug = ' " +dta.slug + "'"
                    +"               class= 'btnAdd' style = 'background: #000;color: white;display: inline-block; padding: 8px 16px; margin-top: 15px; float: right;'>Add Product</a> "
                    +"              <div style = 'clear: both'></div>"
                    + "   </div>"
                    + "   </div>"
                    + "  </div>"
                    + "   </div>"
                })
                $('.row-category.product-items').html(html)
            }

        })
        $(".btnAdd").each((i, ele) => {
            $(ele).click(async function(){
                var id = $(this).data("id")
                var nameImg = $(this).data("imgname")
                var nameProd = $(this).data("nameprod")
                var price= $(this).data("price")
                var slug= $(this).data("slug")
                var quantityProd = 1
                var us_id = $(".user-login").data("iduser")
                if(us_id != null || us_id == ""){
               
              
                    var  obJPro = {
                        id,
                        nameImg,
                        nameProd,
                        priceProd : price,
                        quantityProd,
                        slug,
                        us_id 
                    }
                      console.log(obJPro)
                        await $.ajax({
                         type : "POST",
                         url : "/add-product-cart",
                         data : obJPro,
                         success : function(dta){
                             alert("Đã thêm vào giỏ hàng")
                         }
                       })
                       socket.emit("products-in-cart" , "hasData")      
                 }else{
                     $(".modal").each((i, ele) => {
                         if(i==0){
                           $(ele).addClass("openXN")
                         }
                     })
                 }
            })
        })
    })

    $('.btnCountnext').click(async function () {
        $(".btnCount1").parent().attr("class", "none")
        $(".btnCount2").parent().attr("class", "none")
        $(".btnCount3").parent().attr("class", "none")
        $(".btnCountnext").parent().attr("class", "active")
        count++;
        await $.ajax({
            type: "GET",
            url: `http://localhost:3426/admin/get-product-page/${count}`,
            success: function (data) {
                var html = "";
                $.each(data, (i, dta) => {
                    html += " <div style = 'overflow: hidden; height: 650px; margin: 0 0 15px 0' class='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-6 product-col'>"
                    + " <div class='product-tile'>"
                    + "  <div class='product-image'>"
                    + "   <a class='thumb-link' href='/img-product/"+dta.image.name+"' title='"+dta.Name+"'>"
                    + "       <div class='swap-on-hover-front-image'>"
                    + "           <img class='img-responsive lazy' src='/img-product/"+dta.image.name+"'"
                    + "                  data-src='/img-product/"+dta.image.name+"' id='img-product'"
                    + "                   alt='"+dta.Name+"'>"
                    + "          </div>"
                    + "       </a>"
                    + "   </div>"
                    + "   <div class='product-des'>"
                    + "        <div class='product-sale'> </div>"
                    + "       <div class='product-desc'>"
                    + "           <a style = 'margin: 15px 0; display: block; font-size: 35px; font-family: Poppins; color : orange ' class='thumb-link' href='/img-product/"+dta.image.name+"' "
                    + "               title='Đầm tiểu thư'>"+dta.Name+"</a>"
                    + "        </div>"
                    + "        <div class='product-pricing' data-price='200000'>"
                    + "           <span style = 'display: block; font-size: 20px;' class='product-discount-price'"
                    + "                title='Đầm tiểu thư'>"+dta.Price+"$</span>"
                    +"              <a data-id = '"+dta.idData+"' data-imgname = '"+dta.image.name+"' data-nameprod = '"+dta.Name+"' data-price = '"+dta.Price+"' data-slug = ' " +dta.slug + "'"
                    +"               class= 'btnAdd' style = 'background: #000;color: white;display: inline-block; padding: 8px 16px; margin-top: 15px; float: right;'>Add Product</a> "
                    +"              <div style = 'clear: both'></div>"
                    + "   </div>"
                    + "   </div>"
                    + "  </div>"
                    + "   </div>"
                })
                $('.row-category.product-items').html(html)
            }

        })

        $(".btnAdd").each((i, ele) => {
            $(ele).click(async function(){
                var id = $(this).data("id")
                var nameImg = $(this).data("imgname")
                var nameProd = $(this).data("nameprod")
                var price= $(this).data("price")
                var slug= $(this).data("slug")
                var quantityProd = 1
                var us_id = $(".user-login").data("iduser")
                if(us_id != null || us_id == ""){
               
              
                    var  obJPro = {
                        id,
                        nameImg,
                        nameProd,
                        priceProd : price,
                        quantityProd,
                        slug,
                        us_id 
                    }
                      console.log(obJPro)
                        await $.ajax({
                         type : "POST",
                         url : "/add-product-cart",
                         data : obJPro,
                         success : function(dta){
                             
                         }
                       })
                       socket.emit("products-in-cart" , "hasData")      
                 }else{
                     $(".modal").each((i, ele) => {
                         if(i==0){
                           $(ele).addClass("openXN")
                         }
                     })
                 }
            })
        })
       
    })

 
  


})