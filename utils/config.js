require('dotenv').config()

MONGO_URI=process.env.MONGO_URI
PORT= process.env.PORT
module.exports= {MONGO_URI, PORT}