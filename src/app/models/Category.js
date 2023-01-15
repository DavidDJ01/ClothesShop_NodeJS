const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)


const categorys = new Schema({
    NameCategory : { type: String },
    slug: { type: String, slug: "NameCategory", unique: true },
})

module.exports = mongoose.model("categorys", categorys)
