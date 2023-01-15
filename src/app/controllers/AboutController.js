

class AboutController{
    index(req, res, next)
    {   
        const dtta = req.cookies.User;
             if(dtta != null){
                  var dta = dtta
                  return res.render("giaodien/about", {dta, yUser : true})
             }else{
                  return res.render("giaodien/about", {yUser : false})
             }
    }
}

module.exports = new AboutController