const router = require("express").Router()
const messages = require("../Models/Messages")
const conversation = require("../Models/Conversation")

//add
router.post('/', async (req, res) => {
    const newMessage = new messages(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.json(savedMessage)
    } catch (error) {
        res.json(error)
    }

})

// get

router.get("/:coversationId", async (req, res) => {
    try {
        const Messages = await messages.find({
            conversationId: req.params.coversationId
        })

        res.json(Messages)

    } catch (error) {
        res.json(error)
    }
})


module.exports = router