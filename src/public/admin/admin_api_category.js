$(document).ready(async function(){
    await $.ajax({
         type : "GET",
         url : "http://localhost:3426/api/get-list-Category",
         success :  function(data){
             var html = null;
             $.each(data, (i, dta) => {
                 html += "<tr>" 
                     +   "<td class=\"people\"> "+(i+1)+"</td>"
                     +   "<td class=\"people-des\">"+dta._id+" </td>"
                     +   "<td class=\"role\">"+ dta.NameCategory+" </td>"
                     +   "<td class=\"edit\"> <a data-id = '"+ dta._id + "' data-name = '" + dta.NameCategory + "'"
                     +    "class=\"edit_Categr\" href=\"#\" style = 'padding: 10px 45px;'>Edit</a></td>"           
                     +   "<td class='delete'> <a data-id = '"+ dta._id + "' data-name = '" + dta.NameCategory + "' class='delete_Cgr' href='#'> Delete </a></td>"
                     + " </tr>"
             }) 
             $('#products').html(html)
         }
     })

     $('.btn_Add_Cgr').click(function(){
        $(".addCategory").each((i, ele) => {
            if(i == 0){
                $(ele).addClass("openXN")
            }
        })
    })
 
    $(".close-add-categr").click(function(){
        $(".addCategory").each((i, ele) => {
            if(i == 0){
                $(ele).removeClass("openXN")
            }
        })
    })
    
    $(".close-update-categr").click(function(){
        $(".addCategory").each((i, ele) => {
            if(i == 1){
                $(ele).removeClass("openXN")
            }
        })
    })

    $(".close-delete-categr").click(function(){
        $(".addCategory").each((i, ele) => {
            if(i == 2){
                $(ele).removeClass("openXN")
            }
        })
    })

    $(".edit_Categr").each((i, ele) => {
         $(ele).click(function(){
             var id =  $(ele).data("id")
             var name = $(ele).data("name")
            $(".addCategory").each((i, ele) => {
                if(i == 1){
                    $(ele).addClass("openXN")
                    $('#id_Cgr_ud').val(id)
                    $('#id_Cgr_ud').css("fontSize", "20px")
                    $('#name_Cgr_ud').val(name)
                    $('#name_Cgr_ud').css("fontSize", "20px")
                }
            })
         })
    })

    $(".delete_Cgr").each((i, ele) => {
        $(ele).click(function(){
            var id =  $(ele).data("id")
            var name = $(ele).data("name")
           $(".addCategory").each((i, ele) => {
               if(i == 2){
                   $(ele).addClass("openXN")
                   $('#id_Cgr_dl').val(id)
                   $('#id_Cgr_dl').css("fontSize", "20px")
                   $('#name_Cgr_dl').val(name)
                   $('#name_Cgr_dl').css("fontSize", "20px")
               }
           })
        })
   })



   


    })
  
  
 
   