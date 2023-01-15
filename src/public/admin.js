 //form login 

 const modal = document.querySelector(".modal");
 const  btnClose = document.querySelector('.modal header .nav-closee');
 const signin = document.querySelector('.sign-in');
 const formlogout = document.forms["log-out"];
 const btnlog = document.querySelector('.log-out');
 const xacnhan = document.querySelector('.xacnhan');
 const  btnCloseXN = document.querySelector('.xacnhan .nav-closee');
 
 
 btnClose.onclick = function(){
     modal.classList.remove("open");
 }
 
 btnCloseXN.onclick = function(){
     xacnhan.classList.remove("openXN")
 }
 
 if(signin != null){
    signin.onclick = function (){
        modal.classList.add("open")
     }
     
 }

 
btnlog.onclick = function (){
    xacnhan.classList.add("openXN")
}

