const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect("mongodb://localhost:27017/Clothes_Shop");
       // await mongoose.connect('mongodb://localhost:27017/education_product')
        console.log("Connect Successfuly")
    } catch (error) {
        console.log("Connect Fail")
    }
   

}

module.exports = { connect };