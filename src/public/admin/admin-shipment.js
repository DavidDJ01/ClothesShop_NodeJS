
$(document).ready(async function(){
    var quantityAll = []
    var lstIdShipment = []
    await $.ajax({
        type : "GET",
        url : "http://localhost:3426/admin/get-shipment",
        success : function(data){
            var html = null;
            $.each(data, (i, dta) => {
                lstIdShipment.push(dta.idData)
                 html += "<tr>" 
                +   "<td class=\"people\"> <img class= 'img-tb' data-name = '" + dta.image.name +"' src='/img-product/"+dta.image.name+"'</td>"
                +   "<td class=\"people-des\">"+ dta.idData +" </td>"
                +   "<td class=\"role\">"+ dta.Name +" </td>"
                +   "<td>"+ dta.Category +"</td>"
                +   "<td> "+ dta.Quantity +"</td>"
                +   "<td>"+ dta.Price +"</td>"
                +   "<td>"+ dta.Description +"</td>"
                +   "<td>"+ dta.Color +"</td>"         
                +   "<td class='delete'> <a data-id = '"+ dta.idData+ "' data-name = '" + dta.Name + "' data-img = '" +dta.image.name+"' class='delete_shipment' href='#'> Delete </a></td>"
                + " </tr>"
            }) 
            $('#products').html(html)
        }
  
     })
      //--------------------------------
     var tongArrray = []
    await $.ajax({
        type : "GET",
        url : "http://localhost:3426/api/get-product",
        success :  function(data){
            var html = null;
            
            $.each(data, (i, dta) => {
                tongArrray.push(data)
                quantityAll.push({id : dta._id, quantity :dta.Quantity})
                html += "<tr>" 
                    +   "<td class=\"people\"> <img class= 'img-tb' data-name = '" + dta.image.name +"' src='/img-product/"+dta.image.name+"'</td>"
                    +   "<td data-id = '"+dta._id+"' class=\"role\">"+ dta.Name +" </td>"
                    +   "<td>"+ dta.Category +"</td>"
                    +   "<td>"+ dta.Price +"</td>"
                    +   "<td> <input name = 'Quantity' type = 'number' value='"+ dta.Quantity+"' style = 'width: 60px; font-size: 20px'></td>"
                    +   "<td>"+ dta.Color +"</td>"
                    +   "<td class=\"edit\" style = 'text-align: center'> <a data-id = '"+ dta._id + "'"
                    +       "class=\"choose\" href=\"#\">Chọn</a> <a class = 'not-choose' href='#' data-id = '"+ dta._id + "'>Bỏ chọn</a></td>"           
                    + " </tr>"
            }) 
            $('#productss').html(html)
            
        }
    })

    //--------------Load lại bảng------------------
   console.log(lstIdShipment)
    for(var element of lstIdShipment){
        //console.log(element)
        $('#productss tr').filter(function(index){
              if(element == $(this).children().eq(1).data("id"))
               {  
                 // console.log(element)
                  return $(this).css("display", "none")
               }
        })
    }
    
    //------------------------------------

     $('.not-choose').css("display", "none")

     socket.emit("hello", "Hello nè")
   
    //----------------------------------------
    $('#productss tr ').each((y, e) => {
           $(e).children().eq(4).children().on("change", function(){
            var id = $(e).children().eq(1).data("id")
            var quantiti = $(e).children().eq(4).children().val()
            var boolean = false;
            for(var x = 0 ; x < quantityAll.length ; x++){         
                if(quantityAll[x].id == id){
                    console.log(quantityAll[x].quantity )
                    if(quantiti > quantityAll[x].quantity || quantiti <= -1){     
                        $(e).children().eq(4).children().val("0")
                        break;
                    }
                 }
            }
          
        })
        
        
   })
   

    $('.choose').each((i, ele)=> {
         $(ele).css("color", "green")
        $(ele).click(function(){
            var quantity = null;    
            $('.not-choose').each((j, el) => {      
                $('#productss tr ').each((y , e)=> {
                    if(y == i){
                        quantity =  $(e).children().eq(4).children().val()
                    }
                  
                })    
                if(i == j){           
                   lstproduct.products.push({id : $(el).data("id"), quantity  })
                   $(el).css("display" , "block")
                   $(ele).css("display", "none")
                }
           })
         console.log(lstproduct)
        })
    })

    $('.not-choose').each((i, ele)=> {
        $(ele).css("color", "red")
        $(ele).click(function(){
            $('.choose').each((j, el) => {
                if(i == j){
                //  lstproduct.products.pop({id : $(el).data("id")})
                 for(var x  = 0; x < lstproduct.products.length; x++){
                       if($(el).data("id") == lstproduct.products[x].id){
                             lstproduct.products.splice(x, 1)
                       }             
                 }
                   $(el).css("display", "block")
                   $(ele).css("display", "none")
                }
           })
        })
    })
    ////////////---------- Export Product để từ phía cilent call api-----------------------
    

    var listResProd = []

    var lstproduct = {
         products : []
    }
    $('#btnAdd-Prod').click(async function(){
        if(lstproduct.products.length > 0){
              
            await $.ajax({
                type : "POST",
                url : "http://localhost:3426/admin/add-shipment",
                data : {lstproduct},
                async : true,
                success : function(data){
                    var html = null;
                    $.each(data, (i, dta) => {
                        listResProd.push(dta.idData)
                         html += "<tr>" 
                        +   "<td class=\"people\"> <img class= 'img-tb' data-name = '" + dta.image.name +"' src='/img-product/"+dta.image.name+"'</td>"
                        +   "<td class=\"people-des\">"+ dta.idData +" </td>"
                        +   "<td class=\"role\">"+ dta.Name +" </td>"
                        +   "<td>"+ dta.Category +"</td>"
                        +   "<td>"+ dta.Quantity +"</td>"
                        +   "<td>"+ dta.Price +"</td>"
                        +   "<td>"+ dta.Description +"</td>"
                        +   "<td>"+ dta.Color +"</td>"         
                        +   "<td class='delete'> <a class='delete_shipment' data-id = '"+ dta.idData + "' data-name = '" + dta.Name + "' data-img = '" +dta.image.name+"'  href='#'> Delete </a></td>"
                        + " </tr>"
                    }) 
                    $('#products').html(html)         
                }    
             })
               
             $('.delete_shipment').each((i, ele) => {
                $(ele).click(function(){    
                    console.log("có")
                    var id = $(ele).data("id")
                    var name = $(ele).data("name")
                    var img = $(ele).data("img")
                    $('.modal-form').each((i, ele)=> {
                        if(i == 1){
                            $(ele).addClass('open')
                            $('#ImgDF').attr("src", "/img-product/"+img )
                            $('.id_DL').val(id);
                            $('.name_DL').val(name)
                        }
                    })
                })
             }) 

    
        
              socket.emit("shipment", "true")
              socket.emit("connectData", "true")
        }else{
             $(".addCategory").addClass("open")
             $(".btnOk").click(function(){
                $(".addCategory").removeClass("open")
             })
        }
     
    
    })   

         $('.delete_shipment').each((i, ele) => {
            $(ele).click(function(){    
                console.log("có")
                var id = $(ele).data("id")
                var name = $(ele).data("name")
                var img = $(ele).data("img")
                $('.modal-form').each((i, ele)=> {
                    if(i == 1){
                        $(ele).addClass('open')
                        $('#ImgDF').attr("src", "/img-product/"+img )
                        $('.id_DL').val(id);
                        $('.name_DL').val(name)
                    }
                })
            })
         }) 
     
     
     socket.on("hasData", function(data){
        console.log(data)
        if(data != null){
                for(var element of listResProd){
                    //console.log(element)
                    $('#productss tr').filter(function(index){
                          if(element == $(this).children().eq(1).data("id"))
                           {  
                              console.log(element)
                              return $(this).css("display", "none")
                           }
                    })
                }
             
          }
         
     })
    
   
    //----------------------------------------
    
    $(".btnAddProd").css("cursor", "pointer")
    $(".btnAddProd").click(function(){
         $(".modal-form").each((i, ele) => {
             if(i== 0){
                $(ele).addClass("open")
             }
         })
    })

    $(".close-form-update").click(function(){
        $(".modal-form").each((i, ele) => {
            if(i== 0){
               $(ele).removeClass("open")
            }
        })
    })

    $(".close-form-delete").click(function(){
        $(".modal-form").each((i, ele) => {
            if(i==1){
               $(ele).removeClass("open")
            }
        })
    })
    
    
    // $(".delete_shipment").each((i, ele) => {
    //       $(ele).click(function(){
    //         $(".modal-form").each((i, ele) => {
    //             if(i== 1){
    //                $(ele).addClass("open")
    //             }
    //         })
    //       })
    // })

 

   //------------Xóa Shipment---------------------
   var ShipmentTemp = ""
     $(".btn_dl_shipment").click(async function(){  
            var id = $(".id_DL").val()
            await  $.ajax({
                type : "DELETE",
                url : "http://localhost:3426/admin/delete-shipment",
                data : {id},
                success : function(data){
                    var html = null;
                    $.each(data, (i, dta) => {
                        ShipmentTemp = dta.idData;
                         html += "<tr>" 
                        +   "<td class=\"people\"> <img class= 'img-tb' data-name = '" + dta.image.name +"' src='/img-product/"+dta.image.name+"'</td>"
                        +   "<td class=\"people-des\">"+ dta.idData +" </td>"
                        +   "<td class=\"role\">"+ dta.Name +" </td>"
                        +   "<td>"+ dta.Category +"</td>"
                        +   "<td>"+ dta.Quantity +"</td>"
                        +   "<td>"+ dta.Price +"</td>"
                        +   "<td>"+ dta.Description +"</td>"
                        +   "<td>"+ dta.Color +"</td>"         
                        +   "<td class='delete'> <a data-id = '"+ dta.idData + "' data-name = '" + dta.Name + "' data-img = '" +dta.image.name+"' class='delete_shipment' href='#'> Delete </a></td>"
                        + " </tr>"
                    }) 
                    $('#products').html(html)          
                }    
             })

             window.location.replace("http://localhost:3426/admin/shipment")

     })

})