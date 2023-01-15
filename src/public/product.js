$(document).ready(async function(){
   await $.ajax({
    type : "GET",
    url : "http://localhost:3426/admin/get-shipment",
    success : function(data){
        console.log(data)
        var html = "";
        var htmldm = ""
        $.each(data, (i, dta) => {
            if(i <= 2){
                if(i == 0){
                    html += "<div class='box-clothes'>"
                    +" <div class='box-clothes-backImg'>"
                    +"     <video autoplay loop muted class='back-video'>"
                    +"        <source src='/video/bông tuyết.mp4' type='video/mp4'> "
                    +"       </video> "
                    +"    <div class='box-clothes-backImg-img'> "
                    +"     <img src='/img-product/"+dta.image.name+"' alt=''> "
                    +"      </div> "
                    +"  </div>"
                    +"  <div class='body-content'>"
                    +"    <h1>"+dta.Name+"</h1>"
                    +"    <p>"+dta.Description+"</p>"
                    +"    <p>"+dta.Price+"$ </p>"
                    +"    <a href='/product/detail-product/"+dta.slug+"'>Xem chi tiết</a>"
                    +"   </div>"
                    +" </div>"
                    }
                 else if(i == 1){
                    html += "<div class='box-clothes'>"
                    +" <div class='box-clothes-backImg'>"
                    +"     <video autoplay loop muted class='back-video'>"
                    +"        <source src='/video/tuyết thiên nhiên.mp4' type='video/mp4'> "
                    +"       </video> "
                    +"    <div class='box-clothes-backImg-img'> "
                    +"     <img src='/img-product/"+dta.image.name+"' alt=''> "
                    +"      </div> "
                    +"  </div>"
                    +"  <div class='body-content'>"
                    +"    <h1>"+dta.Name+"</h1>"
                    +"    <p>"+dta.Description+"</p>"
                    +"    <p>"+dta.Price+"$ </p>"
                    +"    <a href='/product/detail-product/"+dta.slug+"'>Xem chi tiết</a>"
                    +"   </div>"
                    +" </div>"
                 }
                 else if(i == 2){
                    html += "<div class='box-clothes'>"
                    +" <div class='box-clothes-backImg'>"
                    +"     <video autoplay loop muted class='back-video'>"
                    +"        <source src='/video/tuyết rơi.mp4' type='video/mp4'> "
                    +"       </video> "
                    +"    <div class='box-clothes-backImg-img'> "
                    +"     <img src='/img-product/"+dta.image.name+"' alt=''> "
                    +"      </div> "
                    +"  </div>"
                    +"  <div class='body-content'>"
                    +"    <h1>"+dta.Name+"</h1>"
                    +"    <p>"+dta.Description+"</p>"
                    +"    <p>"+dta.Price+"$ </p>"
                    +"    <a href='/product/detail-product/"+dta.slug+"'>Xem chi tiết</a>"
                    +"   </div>"
                    +" </div>"
                 }       
                }
                else if(i > 2  && i <= 6){
                    htmldm += "<li style='display: flex; padding: 16px;'> "
                   +" <div > "
                   +"    <img src='/img-product/"+dta.image.name+"' alt='' style='width: 80px; height : 100px;'> "
                   +" </div> "
                   +" <div style='margin-left: 20px;'> "
                   +"   <div class='NameDM'>"
                   +"       <a href='/product/detail-product/"+dta.slug+"' style='font-size: 20px;'> "+dta.Name+"</a> " //link
                   +"    </div> "
                   +"        <p style='font-size: 20px;'> "+dta.Price+"$</p>   "      
                   +" </div> "
                   +" </li> "
                }             
    }) 
       $('.clothes .container').html(html)
       $(".collapse.navbar-collapse.navbar-ex1-collapse .verticalmenu.nav.navbar-nav.new").html(htmldm)
    }
   })
   
   await $.ajax({
    type : "GET",
    url : "http://localhost:3426/admin/get-shipment",
    success : function(data){
        var html = "";
        $.each(data, (i, dta) => {
           if(i >= 4 && i <= 12){
              html += "<div class='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-6 product-col'>"
             +" <div class='product-tile'>"
             +"    <div class='product-image'>"
             +"        <a class='thumb-link' href='/img-product/"+dta.image.name +"' title='"+dta.Name +"'>"   // link chi tiết 
             +"            <div class='swap-on-hover-front-image'>"
             +"                <img class='img-responsive lazy' src='/img-product/"+dta.image.name +"'"
             +"                     data-src='/img/"+dta.image.name +"' id='img-product' alt='Đầm 2 dây'>"
             +"             </div>"
             +"        </a>"
             +"    </div>"
             +"    <div class='product-des'>"
             +"       <div class='product-sale'> </div>"
             +"      <div class='product-desc'>"
             +"          <a style = 'margin: 15px 0; display: block; font-size: 35px; font-family: Poppins; color : orange ' class='thumb-link' href='/product/detail-product/"+dta.slug+"' title='Đầm 2 dây'>"+dta.Name +"</a>" // link
             +"      </div>"
             +"     <div class='product-pricing' data-price='200000'>"
             +"       <span style = 'display: block; font-size: 20px;' class='product-discount-price' title='Đầm 2 dây'>"+dta.Price+"$</span>"
             +"     </div>"
             +"    </div>"
             +"    </div>"
             +" </div>"
           }
            
        }) 
        $('.containerr .row').html(html)
    }

 })

 $(".collapse.navbar-collapse.navbar-ex1-collapse .verticalmenu.nav.navbar-nav.new")
  


})