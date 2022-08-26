const router = require("express").Router()
const Credentials = require("../Models/Credentials")
const jwt = require("jsonwebtoken")

// Signup
router.post("/signup", async (req, res) => {
    const userCredential = req.body

    try {
        // validate
        const isExisting = await Credentials.findOne({name:req.body.name, email:req.body.email})
        if(isExisting){
           return res.json({message:"User already exist", isSignedUp:false})
        }
        // save user
        const newUser = new Credentials(userCredential)
        await newUser.save()
        res.status(200).send({message:"Successfully Signed Up", isSignedUp:true})
    } catch (error) {
        res.json(error)
    }
    
})


// Login
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await Credentials.findOne({email:email, password:password})
        // console.log(isExist)
        if(!user){
            return res.json({message:"Invalid Credentials"})
        }
        // create jwt token
        const token = await jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:1})
        // send token
        res.json({token,user})
    } catch (error) {
        res.send(error)
    }
})

module.exports = router