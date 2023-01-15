
$(document).ready(function(){
     $("#button-cart").on("click", async function(){
        var id = $(".nameSP").data("id")
        var nameImg = $(".img-responsive").data("imgname")
        var nameProd = $(".nameSP").text()
        var price= $(".zw-price").text()
        var quantityProd = $("#input-quantity").val()
        var slug = $(".nameSP").data("slug")
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
           if(quantityProd == 0){
              alert("Hãy chọn số lượng")
           }else{


              await $.ajax({
                type : "POST",
                url : "/add-product-cart",
                data : obJPro,
                success : function(dta){
                    alert("Đã thêm vào giỏ hàng")
                }
              })
              socket.emit("products-in-cart" , "hasData")
           }
           
        }else{
            $(".modal").each((i, ele) => {
                if(i==0){
                  $(ele).addClass("openXN")
                }
            })
        }
      
     })
   

     
})