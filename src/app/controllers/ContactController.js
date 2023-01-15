class ContactController{
    index(req, res, next)
    {   
        const dtta = req.cookies.User;
             if(dtta != null){
                  var dta = dtta
                  return res.render("giaodien/contact", {dta, yUser : true})
             }else{
                  return res.render("giaodien/contact", {yUser : false})
             }
    }
}

module.exports = new ContactController