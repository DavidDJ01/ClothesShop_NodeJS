const account = require("../models/Account")
const nodeMailer = require("nodemailer")
const multer = require("multer")
var code = "";
const path = require('path');
const { TRUE } = require("node-sass");
const Product = require("../models/Product")
const Category = require("../models/Category")
const Orders = require("../models/Orders")
// var storage = multer.diskStorage({
//      destination : path.join( " src\\public\\uploads"),
//      filename : (req, file, cb) => {
//         cb(null, file.originalname )
//      }
// })

class HomeController{
  
    async index(req, res, next){
        // var user = {
        //     name : "David Đạo",
        //     age : 18
        //  }
        res.clearCookie("Code")
        const dtta = req.cookies.User;
        var dtaUser = ""
        if(dtta != null){
            if(dtta.access != "admin"){
                var dta = dtta
                return res.render("giaodien/home", {dta, yUser : true, yAdm : false});
            }
            else if(dtta.access == "admin"){
                var tong_SL_Pro = []
                await Product.find({}).then(dta => {
                    tong_SL_Pro = dta.map(ele => ele.toObject)
                })
                
                var tong_SL_Category = []
                await Category.find({}).then(dta => {
                    tong_SL_Category = dta.map(ele => ele.toObject())
                })
                
                var DonHang = []
                 await Orders.find({})
                 .then(dta => {
                    
                    DonHang = dta.map(ele => {
                        if(ele.Status == false){
                            return ele.toObject();  
                        }
                    }) 
                 })

                await account.find({})
              .then(dta => {
                   dtaUser = dta.map(ele => ele.toObject())
                 })
                return res.render("adminUI/admin_User", {tong_SL_User: dtaUser, yAdm : true, dtta , title : "Table List User", tong_SL_Pro, tong_SL_Category, DonHang})
            }
        }
        else if(dtta == null ){
            return res.render("giaodien/home", { yUser : false});
        }
        
    }

    // UI Admin
    async admin(req, res, next){
        const dtta = req.cookies.User;
        var tong_SL_Pro = []
        await Product.find({}).then(dta => {
            tong_SL_Pro = dta.map(ele => ele.toObject)
        })
        
        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })
    
        await account.find({})
        .then(dta => {
                return res.render("adminUI/admin_User", {tong_SL_User: dta.map(dta => dta.toObject(),), yAdm : true, dtta , title : "Table List User", tong_SL_Pro, tong_SL_Category})
        })
        .catch(next)
    }

 
     
    // UI Admin
   async getLstUS(req, res, next){
        const dtta = req.cookies.User;
        var tong_SL_Pro = []
        await Product.find({}).then(dta => {
            tong_SL_Pro = dta.map(ele => ele.toObject)
        })

        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })

        var DonHang = []
        await Orders.find({})
        .then(dta => {
           for(var x of dta){
                if(x.Status == "false"){
                    DonHang.push(x)
                }
           }
           
           
        })

        await account.find({})
        .then(dta => {
                if(dtta.access == "admin"){

                    return res.render("adminUI/admin_User", {tong_SL_User : dta.map(dta => dta.toObject(),), yAdm : true, dtta, title : "Table List User", tong_SL_Pro , tong_SL_Category, DonHang })
                }else{
                    res.send("Bạn không có quyền truy cập")
                }
        })
        .catch(next)
    }


    login(req, res, next){
        
        account.findOne({email : req.body.email, passWord : req.body.passWord})
        .then(dta => {
            if(dta != null){     
                res.cookie("User", dta, {
                    maxAge : 24*60*60*1000,
                    httpOnly : false,
                })

                if(dta.access == "admin"){
                  return res.redirect("/admin/list-user")
                }
                else{     
                   return res.redirect('/')  
                  }
            }else{
                // res.render("giaodien/home", {yUser : false,
                //                              messEr : "Tài khoản hoặc mật khẩu không đúng"})
               
                return  res.render("giaodien/home", { errLogin : true ,errMess : "Không tìm thấy tài khoản hoặc mật khẩu", yUser : false, yCode : false, ySignOut : false})
            }
        })
    }

    logout(req, res, next){
        res.clearCookie('User');
        return res.redirect("/")
    }

   async getCode(req, res, next){

         var posible = "qwertyuiopasdfghjklzxcvbnm1234567890"
         var lenght = 5

        for(let i = 0; i < lenght ; i++){
            code += posible.charAt(Math.floor(Math.random() * posible.length))
         }

         res.cookie("Code", code, {
                    maxAge : 1000 * 1000,
                    httpOnly : true,
                    secure : false,
                    
         })


        
        var transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: 'chidao1090@gmail.com',
                pass: 'jfsqusqbfmmhpjlp'
            }
        });
    
        await transporter.sendMail(
            {
                from: 'chidao1090@gmail.com',
                to: `${req.body.email}`,
                subject: "This is Code send you",
                text: "send message",
                html: `<h1 style ='color : red '>Mã code is ${code} </h1>`
            }, (err) => {
                if (err) {
                    return res.json({
                        message: "Lỗi",
                        err
                    })
                } else if (!err)
                    return res.json({
                        menubar: 'thanh cong'
                    })
            }
        
        )

        code = "";
         
        res.render("giaodien/home" , {yCode : true, yUser : false})
    }     

    checkCode(req, res, next){
        const checkcode = req.cookies.Code
        if(checkcode == req.body.code)
            res.render("giaodien/home", {ySignOut : true, yCode : false , yUser : false})
        else{
            res.render("giaodien/home", {ySignOut : false, yCode : true , yUser : false})
        }
    }


    signOut(req, res, next){
         const us = new account({
            firstName : req.body.firstName,
            email : req.body.email,
            passWord : req.body.passWord,
            access : "khachhang",
            numberPhone : req.body.numberPhone
         })
         us.save()
         .then(()=> res.redirect("/"))
    }
    
    // UI Admin
    //[get]
    async createUI(req, res, next){
          const dtta = req.cookies.User;
          if(dtta.access == "admin"){

        
          var tong_SL_Pro = []
          await Product.find({}).then(dta => {
              tong_SL_Pro = dta.map(ele => ele.toObject)
          })

          var tong_SL_Category = []
          await Category.find({}).then(dta => {
              tong_SL_Category = dta.map(ele => ele.toObject())
          })

          var DonHang = []
          await Orders.find({})
          .then(dta => {
             for(var x of dta){
                  if(x.Status == "false"){
                      DonHang.push(x)
                  }
             }
             
             
          })

          await account.find()
          .then(dta => res.render("adminUI/createUSUI", {yAdm : true , tong_SL_User : dta.map(dta => dta.toObject()), yCode : false , ySignOut : false, dtta , title : "Create User", tong_SL_Pro , tong_SL_Category, DonHang}) )
        }else{
            res.send("Bạn không có quyền truy cập trang này")
        }
    }
    
   
}




module.exports = new HomeController();