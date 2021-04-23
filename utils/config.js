require('dotenv').config()

MONGO_URI=process.env.NODE_ENV === "test" ?
process.env.MONGO_URI_TEST : process.env.MONGO_URI
PORT= process.env.PORT
module.exports= {MONGO_URI, PORT}