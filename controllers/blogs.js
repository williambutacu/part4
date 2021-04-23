
const blogsRouter= require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (req,res)=>{
    
    const blogs = await Blog.find({})
    res.json(blogs)

})

blogsRouter.get("/:id", async (req,res,next)=>{

   const blogfound= await Blog.findById(req.params.id)
   if (blogfound){
       res.json(blogfound)
   }
   else {
       res.status(404).end()
   }

  
})

blogsRouter.post("/",async (req,res,next)=>{
    const blog = new Blog(req.body)
    console.log(blog)
    const savedblog = await blog.save()
    console.log(savedblog)
    res.json(savedblog)
    
})

module.exports=blogsRouter