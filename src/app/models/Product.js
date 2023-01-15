const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)


const products = new Schema({
    Name : { type: String },
    Quantity: { type: Number },
    Price: { type: Number },
    Description: { type: String },
    Color: { type: String },
    Category : {type : String},
    image: {
        name: String,
        data: Buffer,
        content: String,
    },
    slug: { type: String, slug: "Name", unique: true },
})

module.exports = mongoose.model("products", products)

