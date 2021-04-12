const dummy = (blogs)=>{
    return 1
}

const totalLikes = (blogs)=>{
    reducer= (accumulator, currentValue) =>  accumulator + currentValue.likes
    
        
    return blogs.reduce(reducer,0)
    
}

module.exports= {dummy, totalLikes}