// Show nav bar
const nav = document.querySelector(".nav")
const toggle = document.querySelector(".nav-toggle")
const close = document.querySelector(".nav-close")

toggle.addEventListener("click", () => {
    nav.classList.add("show-menu")
    close.classList.add('visible')
})

close.addEventListener("click", ()=>{
    nav.classList.remove("show-menu")
    close.classList.remove('visible')

})

//remove menu bar on mobile

const navLink = document.querySelectorAll('.nav-link')
function linkAction(){
    nav.classList.remove('show-menu')
    close.classList.remove('visible')
}


navLink.forEach(e => e.addEventListener('click', linkAction))

// change active link

const linkColor = document.querySelectorAll('.nav-link')
function colorLink(){
    if(colorLink){
        linkColor.forEach( e => e.classList.remove('active'))
        this.classList.add('active')
    }    
}

linkColor.forEach(e => e.addEventListener('click', colorLink))


//slider

var count = 1;
if(document.getElementById('radio') != null){
setInterval(function(){

   document.getElementById('radio'+count).checked = 'true';
   count++;
   if(count > 4){
    count = 1;
   }

}, 5000);
}

//end


//swiper testmonial



  //form login 

const modal = document.querySelector(".modal");
const  btnClose = document.querySelector('.modal header .nav-closee');
const signin = document.querySelectorAll('.sign-in');


if(btnClose != null){

    btnClose.onclick = function(){
        modal.classList.remove("openXN");
    }
}

if(signin != null){
    signin.forEach(ele => {ele.onclick = function() {
        modal.classList.add("openXN")
  }})
}



// Log out

const formlogout = document.forms["log-out"];
const btnlog = document.querySelectorAll('.log-out');
const xacnhan = document.querySelector('.xacnhan');
const  btnCloseXN = document.querySelector('.xacnhan .nav-closee');

btnCloseXN.onclick = function(){
    xacnhan.classList.remove("openXN")
}

btnlog.forEach(ele => {
    ele.onclick = function(){
    // formlogout.action = '/log-out'
    // formlogout.submit()
    //    console.log(formlogout)
    // }
         xacnhan.classList.add("openXN")
    }
})

// Sign out

const modalSO = document.querySelector(".modal-signout")
const btnSO = document.querySelectorAll(".sign-out")
const  btnCloseSO = document.querySelector('.modal-signout .nav-closee');

btnCloseSO.onclick = function(){
    modalSO.classList.remove("openXN")
}

btnSO.forEach(ele => {ele.onclick = function() {
    modalSO.classList.add("openXN")
}})