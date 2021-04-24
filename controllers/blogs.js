
const blogsRouter= require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (req,res)=>{
    
    const blogs = await Blog.find({})
    res.send(blogs)

})

blogsRouter.get("/:id", async (req,res,next)=>{

   const blogfound= await Blog.findById(req.params.id)
   if (blogfound){
       res.json(blogfound)
       console.log(typeof blogfound.id)
   }
   else {
       res.status(404).end()
   }

  
})

blogsRouter.post("/",async (req,res,next)=>{
    const blog = new Blog(req.body)
    const savedblog = await blog.save()
    res.json(savedblog)
    
})

module.exports=blogsRouter