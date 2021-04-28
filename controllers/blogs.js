
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


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  


blogsRouter.post("/",async (req,res)=>{
   
    const token = getTokenFrom(req)
    const decodedToken= jwt.verify(token, process.env.SECRET)
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
    const blogToBeRemoved = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogsRouter.put("/:id", async(req,res)=>{
    const blog= req.body

    const updatedBlog= await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(updatedBlog)
})

module.exports=blogsRouter