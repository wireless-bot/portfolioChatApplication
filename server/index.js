const express = require("express")
const app = express()


const PORT = process.env.PORT || 5000

const mongoose = require("mongoose")
require("dotenv").config()



const authRoute = require("./Routes/Auth")
const conversationRoute = require('./Routes/Conversation')
const messagesRoute = require("./Routes/Messages")
const usersRoute = require('./Routes/Users')

app.use(express.json())
app.use(express.urlencoded())
app.use("/uploads",express.static("uploads"));

app.use("/auth", authRoute)
app.use('/chatroom',conversationRoute)
app.use('/chatroom/messages',messagesRoute)
app.use("/users",usersRoute)






const ConnectionUri = process.env.CONNECTION_URI
// console.log(ConnectionUri)

mongoose.connect(ConnectionUri).then(() => {
    app.listen(PORT, () => console.log(`server started on ${PORT}`))
})