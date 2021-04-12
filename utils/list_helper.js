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

module.exports= {dummy, totalLikes, favoriteBlog}