$(document).ready(async function(){
    await $.ajax({
        type: "GET",
        url: "http://localhost:3426/admin/get-reports",
        success: function (data) {
            var html = null;
            $.each(data, (i, dta) => {
                html += "<tr>"
                    + "<td class=\"people-des\">" + dta._id + " </td>"
                    + "<td class=\"people-des\">" + dta.IdOrder + " </td>"
                    + "<td>" + dta.IdUser + "</td>"
                    + "<td class=\"people-des\">" + dta.NameCTM+ " </td>"
                    + "<td class=\"people-des\">" + dta.NumberPhone + "</td>"
                    + "<td class=\"people-des\" colspan = '2' > " + dta.Address + "</td>"
                    + "<td>" + dta.Email + "</td>"
                    + "<td>" + dta.IdProduct + "</td>"
                    + "<td>" + dta.NameProduct + "</td>"
                    + "<td>" + dta.Price + "</td>"
                    + "<td>" + dta.Quantity + "</td>"
                    + "<td>" + dta.SumPrice + "</td>"
                    + "<td>" + dta.DateBuy + "$</td>"
                    + "<td class='delete'> <a data-id = '" + dta._id + "' class='btnDLOrder' href='#'> Delete </a></td>"
                    + " </tr>"
            })
            $('#products').html(html)
        }

    }) 

    $(".btnDLOrder").each((i, ele) => {
        $(ele).click(async function(){
            var id = $(this).data("id")
            await $.ajax({
                type : "delete",
                url : "http://localhost:3426/admin/delete-report",
                data : {id},
                success : function(dta){
                     if(dta == "ok"){
                      alert("Đã update")
                      window.location.href = "/admin/page-reports"
                     }else{
                      alert("Có lỗi xảy ra")
                     }
                
                }
               })
        })
    })
    
})