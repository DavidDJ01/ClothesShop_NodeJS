
$(document).ready(function(){
     socket.emit("loadContactUI", "true")

     socket.on("loadContact", function(data){
         var html = ""
          data.map((ele) => {
              html += "<tr>"
                  +"<td>"+ele.id+"</td> "
                  +"<td>"+ele.Name+"</td>"
                  +"<td>"+ele.Phone+"</td>"
                  +"<td>"+ele.Mesage+"</td>"
                  +"<td>"+ele.TimeGive+"</td>"
                  +"<td class='btnDelete' data-id = '"+ele.id+"'  style = 'text-align : center'> <a href='#'>Delete</a></td>"
                  +"</tr>"
        })
        $('#products').html(html)
        $('.btnDelete').each((i, ele) => {
            $(ele).click(function(){
                var id = $(this).data("id")
                 socket.emit("deleteMsg", {id})
                 alert("Xóa thành công")
                 window.location.href = "/admin/contact-manager"
            })
        })
     })



    socket.on("loadContact-2", async function(data) {
        var html = ""
       await data.map((ele) => {
             html += "<tr>"
                   +"<td>"+ele.id+"</td> "
                   +"<td>"+ele.Name+"</td>"
                   +"<td>"+ele.Phone+"</td>"
                   +"<td>"+ele.Mesage+"</td>"
                   +"<td>"+ele.TimeGive+"</td>"
                   +"<td class='btnDelete' data-id = '"+ele.id+"'  style = 'text-align : center'> <a href='#'>Delete</a></td>"
                  +"</tr>"
         })
         $('#products').html(html)
         $('.btnDelete').each((i, ele) => {
             $(ele).click(function(){
                 var id = $(this).data("id")
                  socket.emit("deleteMsg", {id})
                  alert("Xóa thành công")
                  window.location.href = "/admin/contact-manager"
             })
         })
    })
    
})