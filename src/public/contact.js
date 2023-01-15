$(document).ready(function(){
     $(".btn").click(function(){
        var nameCT = $("#nameCT").val();
         var phoneCT = $("#phoneCT").val()
         var msgCT = $("#msgCT").val()

         var obj = {
            nameCT,
            phoneCT,
            msgCT
         }

         socket.emit("contact", obj)
         socket.emit("thongbaosp", "truee")
         alert("Phản hồi của bạn đã được gửi đi")
         $("#nameCT").val("");
         $("#phoneCT").val("")
         $("#msgCT").val("")

     })
})