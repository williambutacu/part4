
const mongoose=require("mongoose")
const { MONGO_URI } = require("../utils/config")



const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
 

  module.exports = mongoose.model("Blog", blogSchema)