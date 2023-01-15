 //form login 
 const modal = document.querySelector(".modal");
 const  btnClose = document.querySelector('.modal header .nav-closee');
//  const signin = document.querySelector('.sign-in');
 const formlogout = document.forms["log-out"];
 const btnlog = document.querySelector('.log-out');
 const xacnhan = document.querySelector('.xacnhan');
 const  btnCloseXN = document.querySelector('.xacnhan .nav-closee');
 const btnED = document.querySelectorAll(".btnEditUS");
 const btnDL = document.querySelectorAll(".btnDeleteUS");


 //
 const modalED = document.querySelectorAll(".editUS")[0];
 const modalDL = document.querySelectorAll(".editUS")[1];
 //
 const  btnCloseED = modalED.querySelector(' header .nav-closee');
 const btnCloseDL = modalDL.querySelector(" header .nav-closee");
 const  inputID = modalED.querySelector(".box-id");
 const  inputName = modalED.querySelector(".box-name");
 const inputEmail = modalED.querySelector(".box-email")
 const inputPass = modalED.querySelector(".box-pass");
 const inputPhone = modalED.querySelector(".box-phone")
 const inputID2 = modalDL.querySelector(".box-id");

 
 
 btnClose.onclick = function(){
     modal.classList.remove("open");
 }
 
 btnCloseXN.onclick = function(){
     xacnhan.classList.remove("openXN")
 }
 
//  signin.onclick = function (){
//     modal.classList.add("open")
//  }
 
 
btnlog.onclick = function (){
    xacnhan.classList.add("openXN")
}
// Update Us

for(var btnED2 of btnED){
    console.log(btnED2);
    btnED2.onclick = function(){
        modalED.classList.add("openXN")
        console.log(this.getAttribute("data-id"))
        var id = this.getAttribute("data-id")
        var fName = this.getAttribute("data-name");
        var emaill = this.getAttribute("data-email")
        console.log(emaill)
        var pass = this.getAttribute("data-pass")
        var nbphone = this.getAttribute("data-numberphone")
        inputID.value = id;
        inputEmail.value = emaill;
        inputName.value = fName;
        inputPass.value = pass;
        inputPhone.value = nbphone;

    }
}

// Delete US

for(var btnDL2 of btnDL){
    btnDL2.onclick = function(){
        modalDL.classList.add("openXN")
        console.log(this.getAttribute("data-id"))
        var id = this.getAttribute("data-id")
   
        inputID2.value = id;
    }
}



btnCloseDL.onclick = function(){
    modalDL.classList.remove("openXN")
}


btnCloseED.onclick = function(){
    modalED.classList.remove("openXN")
}

