
const blogsRouter= require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')



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
    const token = req.token
    const decodedToken= jwt.verify(req.token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return res.status(401).json({error: "missing token or invalid"})
    }
    const user =await User.findById(decodedToken.id)

    const blog = new Blog(req.body) 
    blog.user= decodedToken.id

    if (!blog.likes){
        blog.likes=0
    }

    // const user = await User.findById(req.body.user)

    const savedblog= await blog.save()
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()

    res.json(savedblog)
})

blogsRouter.delete("/:id", async(req,res)=>{

    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return res.status(401).json({error:"missing token or invalid"})
    }

    const blogToBeRemoved = await Blog.findById(req.params.id)

    if (!blogToBeRemoved){
        return res.status(401).json({error:"missing blog"})
    }

    if (blogToBeRemoved.user.toString()===decodedToken.id.toString()){
        
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