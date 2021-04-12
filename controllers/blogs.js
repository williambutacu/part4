
const blogsRouter= require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request,res)=>{
    console.log("lol")
    Blog
        .find({})
        .then(blogs=>res.json(blogs))

})

blogsRouter.get("/:id", (request,res,next)=>{
    Blog
        .findById(req.params.id)
        .then(blog=>{
            if (blog){
                res.json(blog)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error=>next(error))
})

blogsRouter.post("/", (req,res,next)=>{
    const blog = new Blog(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error=>next(error))
})

module.exports=blogsRouter