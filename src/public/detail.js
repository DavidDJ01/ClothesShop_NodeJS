$(document).ready(function(){

    $(".tab1").click(function(){
        console.log($(this))
        $(".tab2").removeClass("active", "show")
        $(this).addClass("active", "show")
        $("#productTabContent .tab-pane").addClass("active")
        $(".tab-pane.review").removeClass("active")
       
    })
    
    $(".tab2").click(function(){
        $(".tab1").removeClass("active", "show")
        $(this).addClass("active", "show")
        $("#productTabContent .tab-pane").removeClass("active")
        $(".tab-pane.review").addClass("active")
    })
    
    $(".inputSL").on("change", function(){
        var value =  $(".soLuongSP").data("quantity")
        if($(this).val() > value || $(this).val() <= -1){
             $(this).val("0")
        }
    })
    
    $(".add-up").on("click", function(){
        var val =  $(".soLuongSP").data("quantity")
        if($(".inputSL").val() >= val || $(".inputSL").val() < 0  ){
            $(".inputSL").val("0")
        }else{
            
            var value = $(".inputSL").val()
            var newval = parseInt(value);
            $(".inputSL").val((newval+1).toString())
        }
    })
    
    $(".add-down").on("click", function(){
        var val =  $(".soLuongSP").data("quantity")
        if($(".inputSL").val() > val || $(".inputSL").val() <= 0  ){
            $(".inputSL").val("0")
        }else{
            
            var value = $(".inputSL").val()
            var newval = parseInt(value);
            $(".inputSL").val((newval-1).toString())
        }
    })
})

