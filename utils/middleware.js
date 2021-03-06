const User = require("../models/user")
const logger= require("./logger")
const jwt = require('jsonwebtoken')

const requestLogger= (req,res, next)=>{
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}



const tokenExtractor = (request,res,next)=>{

    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token=  authorization.substring(7)
    }
  next()
}

const userExtractor = async(req, res, next)=>{

  const decodedToken= jwt.verify(req.token, process.env.SECRET)
    if(!req.token || !decodedToken.id){
        return res.status(401).json({error: "missing token or invalid"})
    }
        req.user = await User.findById(decodedToken.id)

next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
  }