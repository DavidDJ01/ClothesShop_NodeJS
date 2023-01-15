$(document).ready(function(){
$("#search-all").on("keyup", function(){
    var val_search = $(this).val().toLowerCase()
    $("#products tr").filter(function(index){
          $(this).toggle($(this).text().toLowerCase().indexOf(val_search) > -1)
       
        
  })
  // $("#products tr td").filter(function(index){
  //      if($(this).text().toLowerCase().indexOf(val_search) > -1){
  //          var start = $(this).text().indexOf(val_search)
  //          var end = $(this).text().lastIndexOf(val_search)
  //          var text = $(this).text().slice(index, index+1)
  //          console.log(text)
  //          $(this).text().replace("/"+text+"/g", $(this).html("<span style='color : red'>"+text+"</span>"))
  //      }
  // })
})


  
  
})
