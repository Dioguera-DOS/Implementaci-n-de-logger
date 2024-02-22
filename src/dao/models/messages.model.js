const mongoose = require('mongoose');

let messageCollection = 'messages'
let messageSchema = new mongoose.Schema({
    name: String,
    age:Number
})

const messageModel = mongoose.model(messageCollection, messageSchema);
module.exports = testeModel