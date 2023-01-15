
const Account = require("../models/Account");

const account = require("../models/Account")

class ManagerUSController{
    //[patch]
    updateUS(req,res,next) {
        account.updateOne({_id: req.body.id}, {email : req.body.email, firstName : req.body.firstName, passWord : req.body.passWord, access : req.body.access, numberPhone : req.body.numberPhone})

        .then(dta => res.redirect("/admin/list-user"))
        .catch(next)
    }

    deleteUS(req, res, next){
        account.deleteOne({_id : req.body.id})
        .then(dta => res.redirect("/admin/list-user"))
        .catch(next)
    }

   async createUS(req, res, next){
        var newAC = new Account(req.body);
        newAC.save().then(dta => res.redirect("/admin/list-user")).catch(next)

    }


}


module.exports = new ManagerUSController();