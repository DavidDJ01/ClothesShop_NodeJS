const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const orders = new Schema({
    idUser : {type : String},
    AccountName : { type: String },
    Email: { type: String},
    NameCTM: { type: String },
    NumberPhone : {type : String},
    Address : {type : String},
    img: { type: String },
    IdProduct : {type : String},
    NameProduct: { type: String },
    Price: {type : String},
    Quantity : {type: String},
    SumPrice : {type : Number},
    Status : {type : String}
})

module.exports = mongoose.model("orders", orders)
