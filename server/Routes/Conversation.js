const router = require('express').Router()
const jwt = require("jsonwebtoken")
const Conversation = require('../Models/Conversation')

// create conversation
router.post('/conversations', async(req, res) => {
    const newConversation = new Conversation({
        participants: [req.body.senderId, req.body.recieverId]
    })
    try {
        const savedConversation = await newConversation.save()
        res.json(savedConversation)
    } catch (error) {
        res.json(error)
    }
})


// get conversation of a user
router.get('/conversations/:userId', async(req, res) => {
    try {
        const conversation = await Conversation.find({
            participants: {$in : [req.params.userId]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.json(error)
    }
})


module.exports = router