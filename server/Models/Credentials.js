const mongoose = require("mongoose")
const {Schema} = mongoose

const credentialSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profilePhoto: String
},{timestamps:true})

const Credential = mongoose.model("Users", credentialSchema)

module.exports = Credential