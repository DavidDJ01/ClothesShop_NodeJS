$(document).ready(async function(){
    await  $.ajax({
        type : "GET",
        url : "http://localhost:3426/api/get-list-Category",
        success :  function(data){
             var html = "<option>Choose Category...</option>";
             $.each(data, (i, ele) => {
                 html +=  "<option value = '"+ele.NameCategory+ "'>" +ele.NameCategory+"</option>" 
             })
             $(".box-us-right #CategoryAdd").html(html)
             $("#CategoryAdd").html(html)
          }
       
    })

   
         
        // var val = $("#CategoryAdd").val()
        // if(val == "Choose Category..."){
        //    $("#btnSM").css("display", "none")
        //    $("#info").css("display", "block")
        // }
        // $("#CategoryAdd").on("change", function(){
        //     var value = $(this).val()
        //     if(value != "Choose Category..."){
        //         $("#btnSM").css("display", "block")
        //         $("#info").css("display", "none")
        //      }else{
        //         $("#btnSM").css("display", "none")
        //         $("#info").css("display", "block")
        //      }
        // })
     
})