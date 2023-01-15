

$(document).ready(function(){
    socket.emit("thongbaosp", "load")
    socket.on("duyetthongbao", function(data){
        var html = ""     
         if(Array.isArray(data)){
            $(".protofile .bell span").css("display", "block") 
            $(".protofile .bell span").text(data.length)  
            for(var ele of data){
                html += "<li><a href = '/admin/orders-list'>"+ele.Notify+ "  </a></li>"
            }
             $(".bell ul").html(html)
         } else{ 
            $(".protofile .bell span").css("display", "none")   
            for(var ele of data.info){
                html += "<li>"+ele.Notify+"</li>"
            }
            $(".bell ul").html(html)
         } 
         $(".bell li").each((i, ele) => {
              $(ele).click(function(){
                socket.emit("thongbaosp", "false")
              })
         })

    })
   
})