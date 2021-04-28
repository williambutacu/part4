const usersRouter= require("express").Router()
const bcrypt= require("bcrypt")
const User = require("../models/user")



usersRouter.post("/", async(req,res)=>{


    const passwordShort = 
    req.body.password.length <3 ? 
    true
    : false

    if (passwordShort){
        res.status(500).send({error: "password is too short"}) 
        
    }
    else {
    const saltRounds=10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

    const user= new User({
        name: req.body.name,
        username: req.body.username,
        passwordHash
    })

    const savedUser= await user.save()

    res.json(savedUser)
    }
})

usersRouter.get("/", async(req,res)=>{
    const response = await User.find({}).populate("blogs", {user:0})
    res.json(response)
})

usersRouter.get("/:id", async (req,res)=>{
    const user = await User.findById(req.params.id)
    res.json(user)
})

module.exports = usersRouter
