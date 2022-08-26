const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema({
    conversationId: String,
    sender: String,
    text: String,
    time: Date,

})

const Message = mongoose.model("messages", messageSchema)

module.exports = Message