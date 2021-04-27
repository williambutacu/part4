const mongoose  = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')



const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true,
        required:[true, "username is required"],
        min:[2, "Username is too short"]
    },
    name: String,
    passwordHash: {
        type:String,
        required:[true, "password is required"]
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

userSchema.plugin(uniqueValidator)


const User= mongoose.model("User", userSchema)

module.exports= User