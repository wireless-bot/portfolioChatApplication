const {Server} = require('socket.io')

const io = new Server(8900,{
    cors:{
        origin: "http://localhost:3000"
    }
})

let users = []

const addUser = (socketId, userId) => {
   if(!users.some(user => user.userId === userId)) users.push({socketId,userId})
}

const removeUser = (socketId) => {
   users = users.filter(user => user.socketId !== socketId )
}

const getUser = (id) => users.find((usr) => usr.userId === id)


io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on("addUser", data => {
        addUser(socket.id, data.userId)
        console.log("Users",users)

        io.emit("getUsers", users)
    })

    // send and get messages 

    socket.on("sendMessage", ({senderId, recieverId, text}) => {
        console.log("data receiverId", recieverId)
        const user = getUser(recieverId)
        console.log("recieverId: ", user)
        
        socket.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        })

    })

    socket.on("disconnect", () => {
        console.log("User Disconnected")
        removeUser(socket.id)
        io.emit("newOnlineUsers", users)
    })
})