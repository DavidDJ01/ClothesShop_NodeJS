const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reports = new Schema({
    IdOrder : {type : String},
    IdUser : {type : String},
    Email: { type: String},
    NameCTM: { type: String },
    NumberPhone : {type : String},
    Address : {type : String},
    IdProduct : {type : String},
    NameProduct: { type: String },
    Price: {type : String},
    Quantity : {type: String},
    SumPrice : {type : Number},
    DateBuy : {type : Date}
})

module.exports = mongoose.model("reports", reports)