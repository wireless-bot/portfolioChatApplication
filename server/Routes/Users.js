const router = require("express").Router()
const { json } = require("express")
const Credentials = require("../Models/Credentials")
const multer = require('multer')
const fs = require("fs")
const path = require("path")
const ObjectID = require("mongodb").ObjectId
// const ObjectID = require("mongoose").Types.ObjectId

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true)
        
    }else{
        cb(null, false)
    }
}

const upload  = multer({
    storage:storage,
    limits: {
        fileSize: 1024*1024 * 5
    },
    fileFilter: fileFilter
})

// const upload = multer({dest:"uploads/", limits:{fileSize: 1024*1024 * 5}})

// get a user
router.get("/", async (req, res) => {
   try {
    const userId = req.query.userId
    const {_id, name, email, profilePhoto} = await Credentials.findById(userId)
    console.log("userId: ",userId)
    res.json({_id, name, email, profilePhoto})
   } catch (error) {
       res.json(error)
   }
})

router.get("/profiles", async (req, res) => {
    const searchText = req.query.searchText
    // console.log("searchTextfromserver;", searchText)

    //Finding profiles with the containing searchText as name
    try {
        const profiles = await Credentials.find({"name": {$regex:`${searchText}`}})
        profiles && console.log("profiles", profiles)
        res.json({profiles})
    } catch (error) {
        res.json(error)
    }
   
})

// save profilePhoto to database

router.post("/profilePhoto", upload.single('file'), async (req, res) =>{
    // objid =  ObjectID(req.body.userId)
    console.log("File",ObjectID.isValid(req.body.userId))
    console.log("userId", req.body.userId)
    // var objectId = new ObjectID()
    // const userId = new ObjectID(req.body.userId).toHexString()
    const resp = await Credentials.updateOne(
        {"_id": req.body.userId },
    {
        $set: {
            "profilePhoto": req.file.path.toString()
        }
    }
    )
    res.json({resp})
    
})

module.exports = router