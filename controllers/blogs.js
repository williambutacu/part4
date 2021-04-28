
const blogsRouter= require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (req,res)=>{
    
    const blogs = await Blog.find({}).populate("user", {blogs:0})
    res.send(blogs)

})

blogsRouter.get("/:id", async (req,res)=>{

   const blogfound= await Blog.findById(req.params.id)
   if (blogfound){
       res.json(blogfound)
       console.log(typeof blogfound.id)
   }
   else {
       res.status(404).end()
   }

  
})

blogsRouter.post("/",async (req,res)=>{
   

    const blog = new Blog(req.body) 

    if (!blog.likes){
        blog.likes=0
    }

    const user = await User.findById(req.body.user)

    const savedblog= await blog.save()
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()

    res.json(savedblog)
})

blogsRouter.delete("/:id", async(req,res)=>{
    const blogToBeRemoved = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogsRouter.put("/:id", async(req,res)=>{
    const blog= req.body

    const updatedBlog= await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(updatedBlog)
})

module.exports=blogsRouter