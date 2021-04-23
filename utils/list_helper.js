const _ =require("lodash")

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

module.exports= {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}