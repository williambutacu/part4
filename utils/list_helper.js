const _ =require("lodash")
const Blog = require("../models/blog")

const dummy = (blogs)=>{
    return 1
}

const totalLikes = (blogs)=>{
    reducer= (accumulator, currentValue) =>  accumulator + currentValue.likes
    
        
    return blogs.reduce(reducer,0)
    
}

const favoriteBlog = (blogs)=>{
    
reducer= (accumulator,currentValue) => accumulator.likes > currentValue.likes ? accumulator: currentValue
return blogs.reduce(reducer)
}

const mostBlogs = (blogs) =>{
    const result=
    _(blogs)
        .countBy("author")
        .map((obj, key)=>
        ({
            "author": key,
            "blogs": obj
        }))
        .maxBy("blogs")
    
    
    
    return result
    
}

const mostLikes = (blogs) =>{
    const result=
    _(blogs)
        .groupBy("author")
        .map((obj, key)=>{
            
            return ({
            "author": key,
            "likes": _.sumBy(obj, "likes")
        })})
        .maxBy("likes")
return result
}

const initialBlogs = [
    {
        title:"ugamaga",
        author:"luli",
        url:"luizi.com",
        likes: 3
    },
    {
        title: "kowa",
        author:"lulana",
        url: "visit.com",
        likes: 7
    }
]

const blogsInDB = async() =>{
    const blogs = await Blog.find({})
    return blogs.map ( blog => blog.toJSON())
}

module.exports= {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, initialBlogs, blogsInDB}