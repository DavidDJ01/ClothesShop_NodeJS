$(document).ready(async function(){
   await $.ajax({
        type : "GET",
        url : "http://localhost:3426/api/get-product",
        success :  function(data){
            var html = null;
            $.each(data, (i, dta) => {
                html += "<tr>" 
                    +   "<td class=\"people\"> <img class= 'img-tb' data-name = '" + dta.image.name +"' src='/img-product/"+dta.image.name+"'</td>"
                    +   "<td class=\"people-des\">"+ dta._id +" </td>"
                    +   "<td class=\"role\">"+ dta.Name +" </td>"
                    +   "<td>"+ dta.Category +"</td>"
                    +   "<td>"+ dta.Quantity +"</td>"
                    +   "<td>"+ dta.Price +"</td>"
                    +   "<td>"+ dta.Description +"</td>"
                    +   "<td>"+ dta.Color +"</td>"
                    +   "<td class=\"edit\"> <a data-id = '"+ dta._id + "' data-name = '" + dta.Name + "' data-color = '" + dta.Color + "' data-category = '" + dta.Category + "' data-desc= '" + dta.Description + "' data-price= '" + dta.Price + "' data-quantity = '" + dta.Quantity + "' data-img = '" +dta.image.name+"'"
                    +       "class=\"edit_Pro\" href=\"#\">Edit</a></td>"           
                    +   "<td class='delete'> <a data-id = '"+ dta._id + "' data-name = '" + dta.Name + "' data-img = '" +dta.image.name+"' class='delete_Pro' href='#'> Delete </a></td>"
                    + " </tr>"
            }) 
            $('#products').html(html)
        }
    })
    // end ajax
   
 
    // mở form
 $('.edit_Pro').each((i, ele)=> {
    $(ele).click(function(){
        var id = $(ele).data("id")
        var name = $(ele).data("name")
        var color = $(ele).data("color")
        var desc = $(ele).data("desc")
        var category = $(ele).data("category")
        var quantity = $(ele).data("quantity")
        var price = $(ele).data("price")
        var img = $(ele).data("img")
        console.log(img)
        $('.modal-form').each((i, el) => {
              if(i==0){
                   $(el).addClass('open')
                   $(".id").val(id)
                   $(".ImgDF").attr("src", "/img-product/"+img);
                   $(".NamePro").val(name)
                   $("#CategoryAdd option").filter(function(){
                         if($(this).text() == category){
                               $(this).attr("selected", "selected")
                         }
                   })
                   $(".desc").val(desc)
                   $(".Color").val(color)
                   $(".Quantity").val(quantity)
                   $(".Price").val(price)          
              }
        })

    })
 })
   // ĐÓng form
   $('.close-form-update').click(function(){
    $('.modal-form').each((i,ele) => {
          if(i==0){
               $(ele).removeClass('open')
          }
    })
})
$('.close-form-delete').click(function(){
    $('.modal-form').each((i,ele) => {
          if(i==1){
               $(ele).removeClass('open')
          }
    })
})
 
var imgName = null;

 $('.delete_Pro').each((i, ele) => {
    $(ele).click(function(){
        var id = $(ele).data("id")
        var name = $(ele).data("name")
        var img = $(ele).data("img")
        imgName = img

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
 $('#ImgDF').click(function(){
    window.location.replace("http://localhost:3426/img-product/"+imgName)
   
 })
 $('.img-tb').each((i, ele) => {
    $(ele).css("cursor", "Pointer")
    $(ele).click(function(){
        window.location.replace("http://localhost:3426//img-product/"+$(ele).data("name"))
    })
})

 $('#ImgDF').css("cursor", "pointer")
  
 $("#CategoryAdd").on("change", function(){
    var val_search = $(this).val().toLowerCase()
    $("#products tr").filter(function(index){
          $(this).toggle($(this).children().eq(3).text().toLowerCase().indexOf(val_search) > -1)
          $("#products").children().children().css("backgroundColor", "white")
       
        
  })
})


$("#sortProd").on("change", function(){
    var arr = []
    var val_search = $(this).val().toLowerCase()
    //console.log($("#products").children().children())
    // thằng a , b  được truy vấn tiếp ( Vì a và b là chính #products)
    if(val_search == 1){
        arr = $("#products").children().sort(function(a, b){
            so1 = new Float32Array($(a).children().eq(5).text()) 
            so2 = new Float32Array($(b).children().eq(5).text()) 
            $(a).children().eq(5).css("backgroundColor", "yellow")
            $(b).children().eq(5).css("backgroundColor", "yellow")
            $(a).children().eq(2).css("backgroundColor", "white")
            $(b).children().eq(2).css("backgroundColor", "white")
            return so1 > so2 ? 1 : -1
       })
    }else if(val_search == 2){
        arr = $("#products").children().sort(function(a, b){
            so1 = new Float32Array($(a).children().eq(5).text()) 
            so2 = new Float32Array($(b).children().eq(5).text()) 
            $(a).children().eq(5).css("backgroundColor", "yellow")
            $(b).children().eq(5).css("backgroundColor", "yellow")
            $(a).children().eq(2).css("backgroundColor", "white")
            $(b).children().eq(2).css("backgroundColor", "white")
            return so1 < so2 ? 1 : -1
       })
    }else if(val_search == 3){
        arr = $("#products").children().sort(function(a, b){
            so1 = ($(a).children().eq(2).text()) 
            so2 = ($(b).children().eq(2).text()) 
            $(a).children().eq(5).css("backgroundColor", "white")
            $(b).children().eq(5).css("backgroundColor", "white")
            $(a).children().eq(2).css("backgroundColor", "yellow")
            $(b).children().eq(2).css("backgroundColor", "yellow")
            return so1 < so2 ? 1 : -1
       })
    }else if(val_search == 4){
        arr = $("#products").children().sort(function(a, b){
            so1 = ($(a).children().eq(2).text()) 
            so2 = ($(b).children().eq(2).text()) 
            $(a).children().eq(5).css("backgroundColor", "white")
            $(b).children().eq(5).css("backgroundColor", "white")
            $(a).children().eq(2).css("backgroundColor", "yellow")
            $(b).children().eq(2).css("backgroundColor", "yellow")

            return so1 > so2 ? 1 : -1
       })
    }
 
    $("#products").append(arr)
  
})



})

