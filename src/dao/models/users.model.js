const mongoose = require('mongoose');

const userCollection = "users"
const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email:{type: String, unique: true},
    password: String,
    carts: {type:[
        {
            cart:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"carts"
            }
        }
    ]},
    role: String

})

const usersModel = mongoose.model(userCollection, usersSchema)
module.exports = usersModel 

