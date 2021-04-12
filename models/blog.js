require('dotenv').config()

const mongoose=require("mongoose")



const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
    
  const mongoUrl = `mongodb+srv://admin-william:${process.env.MONGO_PASS}@cluster0.xhcws.mongodb.net/ReturnDB?retryWrites=true&w=majority`
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  module.exports = mongoose.model("Blog", blogSchema)