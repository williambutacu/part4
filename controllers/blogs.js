
const blogsRouter= require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const { userExtractor } = require("../utils/middleware")



blogsRouter.get("/", async (req,res)=>{
    
    const blogs = await Blog.find({}).populate("user", {blogs:0})
    res.send(blogs)

})

blogsRouter.get("/:id", async (req,res)=>{

   const blogfound= await Blog.findById(req.params.id)
   if (blogfound){
       res.json(blogfound)
   }
   else {
       res.status(404).end()
   }

  
})





blogsRouter.post("/",userExtractor, async (req,res)=>{
   

    const blog = new Blog(req.body) 
    blog.user= req.user.id

    if (!blog.likes){
        blog.likes=0
    }

    const user = req.user
    const savedblog= await blog.save()
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()

    res.json(savedblog)
})

blogsRouter.delete("/:id",userExtractor, async(req,res)=>{

   

    const blogToBeRemoved = await Blog.findById(req.params.id)

    if (!blogToBeRemoved){
        return res.status(401).json({error:"missing blog"})
    }

    if (blogToBeRemoved.user.toString()===req.user.id.toString()){
        
        await blogToBeRemoved.remove()
        res.status(204).end()

    }



})

blogsRouter.put("/:id", async(req,res)=>{
    const blog= req.body

    const updatedBlog= await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(updatedBlog)
})

module.exports=blogsRouter