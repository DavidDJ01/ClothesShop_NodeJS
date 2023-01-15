
$(document).ready(async function () {
    await $.ajax({
        type: "GET",
        url: "http://localhost:3426/admin/get-orders",
        success: function (data) {
            var html = null;
            $.each(data, (i, dta) => {
                html += "<tr>"
                    + "<td class=\"people\"> <img class= 'img-tb' data-name = '" + dta.img + "' src='/img-product/" + dta.img + "'</td>"
                    + "<td class=\"people-des\">" + dta._id + " </td>"
                    + "<td class=\"people-des\">" + dta.idUser + " </td>"
                    + "<td>" + dta.AccountName + "</td>"
                    + "<td class=\"people-des\">" + dta.NameCTM + " </td>"
                    + "<td class=\"people-des\">" + dta.NumberPhone + "</td>"
                    + "<td class=\"people-des\" colspan = '2' > " + dta.Address + "</td>"
                    + "<td>" + dta.Email + "</td>"
                    + "<td>" + dta.IdProduct + "</td>"
                    + "<td>" + dta.NameProduct + "</td>"
                    + "<td>" + dta.Price + "</td>"
                    + "<td>" + dta.Quantity + "</td>"
                    + "<td>" + dta.SumPrice + "$</td>"
                    + "<td class='delete'> <a data-id = '" + dta._id + "' data-status = '" +dta.Status+"' data-idUser = '" + dta.idUser + "' data-idProd = '" + dta.IdProduct + "' data-nameCTM = '" + dta.NameCTM + "' data-email = '" + dta.Email + "' data-numberphone = '" + dta.NumberPhone + "' data-address = '" + dta.Address + "' data-nameProd = '" + dta.NameProduct + "' data-quantity = '" + dta.Quantity + "' data-price = '" + dta.Price + "' data-sumPrice = '" + dta.SumPrice + "' class='btnDuyet' href='#'> Duyệt </a></td>"
                    + "<td class='delete'> <a data-id = '" + dta._id + "' class='btnDLOrder' href='#'> Delete </a></td>"
                    + " </tr>"
            })
            $('#products').html(html)
        }

    })   
    $(".btnDuyet").each((i, ele) => {
        var stt =  $(ele).data("status")
        if(stt == false){
             $(ele).text("Duyệt")
        
        }else if(stt == true){
             $(ele).text("Đã duyệt")
             $(ele).css("color" , "green")
        }
    })

    $(".btnDLOrder").each((i, ele) => {
         $(ele).on("click", async function(){
             var id = $(this).data("id")
             await $.ajax({
                type : "delete",
                url : "http://localhost:3426/admin/delete-order",
                data : {id},
                success : function(dta){
                     if(dta == "ok"){
                      alert("Đã update")
                      window.location.href = "/admin/orders-list"
                     }else{
                      alert("Có lỗi xảy ra")
                     }
                
                }
               })
         })
    })
     

       $(".btnDuyet").each((i, ele) => {
         $(ele).click( async function(){
            if($(this).data("status") == false){
                var status = "true"
                var id = $(this).data("id")
                var idUser = $(this).data("iduser")
                var idProd = $(this).data("idprod")
                var nameCTM = $(this).data("namectm")
                var email= $(this).data("email")
                var numberphone = $(this).data("numberphone")
                var address = $(this).data("address")
                var nameProd = $(this).data("nameprod")
                var quantity = $(this).data("quantity")
                var price = $(this).data("price")
                var sumPrice = $(this).data("sumprice")
                console.log(idUser)
                await $.ajax({
                      type : "patch",
                      url : "/admin/update-order",
                      data : {id, status, idUser, idProd, nameCTM, email, numberphone,
                              address, nameProd, quantity, price, sumPrice
                              },
                      success : function(dta){
                           if(dta == "ok"){
                            alert("Đã update ! Thông tin đã được lưu lại vào Danh sách Thống kê (Report)")
                           }else{
                            alert("Có lỗi xảy ra")
                           }
                         socket.emit("duyet", "true")
                      }
                     })
               
            }else{
                alert("Đơn hàng đã duyệt")
            }
         })
       })

})

socket.on("daduyet",async function(dta){
     if(dta != null){
        await $.ajax({
            type: "GET",
            url: "http://localhost:3426/admin/get-orders",
            success: function (data) {
                var html = null;
                $.each(data, (i, dta) => {
                    html += "<tr>"
                        + "<td class=\"people\"> <img class= 'img-tb' data-name = '" + dta.img + "' src='/img-product/" + dta.img + "'</td>"
                        + "<td class=\"people-des\">" + dta._id + " </td>"
                        + "<td class=\"people-des\">" + dta.idUser + " </td>"
                        + "<td>" + dta.AccountName + "</td>"
                        + "<td class=\"people-des\">" + dta.NameCTM + " </td>"
                        + "<td class=\"people-des\">" + dta.NumberPhone + "</td>"
                        + "<td class=\"people-des\" colspan = '2' > " + dta.Address + "</td>"
                        + "<td>" + dta.Email + "</td>"
                        + "<td>" + dta.IdProduct + "</td>"
                        + "<td>" + dta.NameProduct + "</td>"
                        + "<td>" + dta.Price + "</td>"
                        + "<td>" + dta.Quantity + "</td>"
                        + "<td>" + dta.SumPrice + "$</td>"
                        + "<td class='delete'> <a data-id = '" + dta._id + "' data-status = '" +dta.Status+"' class='btnDuyet' href='#'> Duyệt </a></td>"
                        + "<td class='delete'> <a data-id = '" + dta._id + "' class='btnDelete' href='#'> Delete </a></td>"
                        + " </tr>"
                })
                $('#products').html(html)
            }
    
        })   
        $(".btnDuyet").each((i, ele) => {
            var stt =  $(ele).data("status")
            if(stt == false){
                 $(ele).text("Duyệt")
            
            }else if(stt == true){
                 $(ele).text("Đã duyệt")
                 $(ele).css("color" , "green")
            }
        })

   
         
    
           $(".btnDuyet").each((i, ele) => {
             $(ele).click( async function(){
                if($(this).data("status") == false){
                    var status = "true"
                    var id = $(this).data("id")
                    await $.ajax({
                          type : "patch",
                          url : "/admin/update-order",
                          data : {id, status},
                          success : function(dta){
                               if(dta == "ok"){
                                alert("Đã update")
                               }else{
                                alert("Có lỗi xảy ra")
                               }
                             socket.emit("duyet", "true")
                          }
                         })
                   
                }else{
                    alert("Đơn hàng đã duyệt")
                }
             })
           })
    
     }
   
  
})
